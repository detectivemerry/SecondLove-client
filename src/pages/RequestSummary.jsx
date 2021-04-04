import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { BounceLoader, BeatLoader } from 'react-spinners'
import { css } from '@emotion/react'

//Redux
import { connect } from 'react-redux';
//import { getUserData } from '../Redux/Actions/userAction';
import { unrequestItem, getRequestByUser } from '../Redux/Actions/itemAction'


class RequestSummary extends Component {

    constructor(props){
        super(props)
        this.handleUnrequest = this.handleUnrequest.bind(this)
    }
    //only ran after refresh ah
    componentDidMount(){
        this.props.getRequestByUser()
    }

    handleUnrequest(itemId){
        this.props.unrequestItem(itemId, this.props.history)
    }
      render() {
        const loaderCSS = css`
            margin-top : 25px;
            margin-bottom : 25px;
            margin-left : 430px;
        `
        return (
          <div>
            <MDBContainer>
            {this.props.loading ?
            <div>
                <BeatLoader 
                    loading = {this.props.loading}
                    size = {72}
                    color = 'pink'
                    css = {loaderCSS}
                    />
            </div> :

              <MDBRow>
                  <MDBCol>
                      <div>
                      <MDBRow>
                          <MDBCol md = '8'><h3>Request summary</h3></MDBCol>
                          <MDBCol md = '3'><Link to = "/profile">
                          <MDBBtn color="pink">Back to profile</MDBBtn>
                        </Link></MDBCol>
                        
                        </MDBRow>
                          <hr />
                          <MDBTable striped>
                              <MDBTableHead>
                                  <tr>
                                      <th>RequestId</th>
                                      <th>RequestDate</th>
                                      <th>View item</th>
                                      <th>Request status</th>
                                      <th>Cancel request</th>
                                  </tr>
                              </MDBTableHead>
                              <MDBTableBody>
                                  {this.props.requests.map((request) => {
                                    {console.log('hey this is the request name = ' + request.requestId)}
                                    let disabled = false
                                    if(request.requestStatus == "Success" || request.requestStatus == "Unsuccessful"){
                                      disabled = true
                                    }
                                    return (
                                      <tr>
                                      <td>{request.requestId}</td>
                                      <td><div>{request.createdAt} </div></td>
                                      <td>
                                        <Link to = {`/itemDetails/${request.itemId}`}>
                                            {request.itemName}
                                        </Link>  
                                      </td>
                                      <td>{request.requestStatus}</td>
                                      <td><MDBBtn color="red" 
                                              onClick={() => this.handleUnrequest(request.itemId)}
                                              disabled = {disabled}>
                                      <MDBIcon icon="ban" className="mr-1" /> Cancel request
                                                          </MDBBtn></td>                                                                               
                                    </tr>
                                    )
                                  })}
                                  {/*this.display*/}
                              </MDBTableBody>
                          </MDBTable>
                      </div>
                  </MDBCol>
              </MDBRow>
              }
          </MDBContainer>
            
              </div>
        )
      }
  }

const mapStateToProps = (state) => ({
    requests : state.item.requestList,
    loading : state.item.loading
  });
  
  RequestSummary.propTypes = {
    user: PropTypes.object.isRequired
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    { getRequestByUser, unrequestItem }
, dispatch);

  
  //export default connect(mapStateToProps)(Profile);
  export default connect(mapStateToProps, mapDispatchToProps)(RequestSummary)