import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PendingItems from '../components/PendingItems';
import { connect } from 'react-redux'
import { getAllBallotItems, ballotItem } from '../Redux/Actions/itemAction'
import { getUserData } from '../Redux/Actions/userAction'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { BounceLoader, BeatLoader, PulseLoader } from 'react-spinners'
import { css } from '@emotion/react'
import Message from '../components/Message'
import { clearMessage, clearError } from '../Redux/Actions/uiAction'

class BallotItems extends Component {

    constructor(props) {
        super(props)
        this.handleBallotItem = this.handleBallotItem.bind(this)
        this.state= {
            //ballot: [],
            ballotLoading: false
        }
    };

    componentDidMount() {
        this.props.getAllBallotItems()
        console.log("ballot items:", this.props.ballotItems)
        this.props.getUserData()
        console.log("userData:", this.props.user.credentials)
        this.props.clearMessage()
    }

    handleBallotItem(itemId) {
        //Need to find how to load the page dynamically
        if (this.props.user.credentials.isAdmin) {
            this.props.ballotItem(itemId)
        }
        else {
            alert("Unauthorised. Please login as admin first.");
            this.props.history.push('/login');
        }
    }

    togglePopup = () => {
        this.props.clearMessage()
    }

    render() {
         //Loading bar CSS
         const loaderCSS = css`
         margin-top : 25px;
         margin-bottom : 25px;
         margin-left : 430px;
     `
     const {
         item : { loading },
         ui : { message, newMessage }
     } = this.props

        return (
            <MDBContainer>
                {loading ? 
                    <BeatLoader 
                    loading = "true"
                    size = {72}
                    color = 'pink'
                    css = {loaderCSS}
                    /> :
                <MDBRow>
                    <MDBCol>
                    {newMessage && 
                    <Message content = {message.message} handleClose = {this.togglePopup} buttonText = "Ok" />}
                    {this.props.ballotLoading ? 
                        <div>
                            <PulseLoader loading = "true" size = {15} color = 'pink' css = {loaderCSS}/>
                            Balloting item... please wait
                        </div> : null}
                        <div>
                            <h3>Ballot Items</h3>
                            <hr />
                            <MDBTable striped>
                                <MDBTableHead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Item name and description</th>
                                        <th>Location</th>
                                        <th>Ballot</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                {this.props.ballotItems.map((eachItem) => {
                                        return (
                                          <tr>
                                           <td><img src={eachItem.imageUrl}
                                                    width='200' 
                                                    height='200' 
                                                    className="img-fluid" 
                                                    alt="ballotItem image">
                                                </img></td>
                                            <td><div>Item name: {eachItem.itemName}</div>
                                            <div>Item condition: {eachItem.itemCondition}</div></td>
                                          <td>{eachItem.location}</td>
                                            <MDBBtn color="success" onClick={() => this.handleBallotItem(eachItem.itemId)}>
                                            <MDBIcon icon="check" className="mr-1" /> Ballot</MDBBtn>
                                                                            
                                        </tr>
                                        )
                                      })}
                                    {/**{this.display} */}

                                    
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
const mapStateToProps = state => {
    return {
        ballotItems: state.item.ballotItemList,
        item : state.item,
        ui: state.ui,
        user: state.user,
        ballotLoading : state.ui.loading
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    { getAllBallotItems, ballotItem, getUserData, clearMessage }
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(BallotItems)