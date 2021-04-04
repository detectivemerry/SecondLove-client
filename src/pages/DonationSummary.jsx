import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { BounceLoader, BeatLoader } from 'react-spinners'
import { css } from '@emotion/react'

//Redux
import { connect } from 'react-redux';
import { getDonationByUser } from '../Redux/Actions/itemAction';
import GoogleMap from '../components/GoogleMap';

class DonationSummary extends Component {

  componentDidMount(){
    this.props.getDonationByUser()
  }

    render() {
      //Loading bar CSS
      const loaderCSS = css`
            margin-top : 25px;
            margin-bottom : 25px;
            margin-left : 430px;
        `
      return (
        <MDBContainer>
          {this.props.loading ? 
            <BeatLoader 
              loading = {this.props.loading}
              size = {72}
              color = 'pink'
              css = {loaderCSS}
            /> :
          
                <MDBRow>
                    <MDBCol>
                        <div>
                            <MDBRow>
                              <MDBCol md = '8'><h3>Donation summary</h3></MDBCol>
                              <MDBCol md = '3'><Link to = "/profile">
                              <MDBBtn color="pink">Back to profile</MDBBtn>
                            </Link></MDBCol>
                            
                            </MDBRow>
                            
                            <hr />
                            <MDBTable striped>
                                <MDBTableHead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Item name</th>
                                        <th>Item status</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                {this.props.donationList.map((donation) => {
                                    return (
                                      <tr>
                                        <td><img src={donation.imageUrl}
                                        width = '200' height= '200' className="img-fluid"></img></td>
                                        <td><div>{donation.itemName} </div></td>
                                        <td><div>{donation.itemStatus} </div></td>
                                      </tr>
                                    )
                                  })}
                                    
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </MDBCol>
                </MDBRow>
            }
            </MDBContainer>
      )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    donationList : state.item.donationList,
    loading : state.item.loading
  });
  
  DonationSummary.propTypes = {
    user: PropTypes.object.isRequired,
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    { getDonationByUser }
, dispatch);

  
  //export default connect(mapStateToProps)(Profile);
  export default connect(mapStateToProps, mapDispatchToProps)(DonationSummary)