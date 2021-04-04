import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardText, MDBCard, MDBCardImage, MDBCardBody } from 'mdbreact'
import CarouselPage from '../components/CarouselPage'
import Card from '../components/Card'
import CategoriesBtn from '../components/CategoriesBtn'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getItem, requestItem } from '../Redux/Actions/itemAction'
import { clearMessage, clearError } from '../Redux/Actions/uiAction'
import { bindActionCreators } from 'redux'
import Message from '../components/Message'
import {Link, useHistory} from 'react-router-dom';

class ItemDetails extends Component {

    constructor (props){
        super(props)
        this.handleRequestItem = this.handleRequestItem.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
    }

    componentDidMount(){
        const { match } = this.props;
        const matchUrl = match.url;
        this.props.getItem(matchUrl)
    }

    handleRequestItem(){
        console.log("button is clicked")
        const { match } = this.props;
        const matchUrl = match.url;
        console.log("this is my match url: "+matchUrl)
        this.props.requestItem(matchUrl)

        //look at dev tools
        //if successful, new message state
        //if unsuccessful new error state
    }

    togglePopup = () => {
        console.log("tooglePopout is geting pressed")
        this.props.clearMessage()
        this.props.clearError()
      }
    
   
    render() {
        return (
            <div>
            {this.props.ui.newMessage && 
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <p>Message</p>
                    <p>{this.props.ui.message.general}</p>
                    <p><button onClick = {this.togglePopup}>Ok</button></p>
                    </MDBCardBody>
                </MDBCard>
            </div>
            }

            {this.props.ui.newError && 
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <p>Error</p>
                    <p>{this.props.ui.errors.error}</p>
                    <p><button onClick = {this.togglePopup}>Ok</button></p>
                    </MDBCardBody>
                </MDBCard>
            </div>
            }


            {/**
             * <Message 
            content = {<>
                <p><b>Message</b></p>
                <p>{this.props.ui.message.general}</p>
            </>}
            handleClose = {this.togglePopup}
            />}
             */}
                
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <h1>{this.props.selectedItem.itemName}</h1>
                    </MDBCol>
                    <MDBCol md = '2'>
                        <MDBBtn>
                            <MDBIcon icon="success" className="mr-1" />
                            Previous page
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol md = '2'>
                        <MDBBtn 
                        onClick = {() => {this.handleRequestItem()}}
                        disabled = {!this.props.selectedItem.approved}
                        >
                            <MDBIcon icon="success" className="mr-1" />
                            Request for item!
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md = '6'>
                        <MDBCardImage className="img-fluid" src={this.props.selectedItem.imageUrl} waves />
                    </MDBCol>

                    <MDBCol md = '6'>
                        <MDBCard>
                            <MDBCardBody>
                                <h4>Description</h4>   
                                   <p>Category : {this.props.selectedItem.category}</p> 
                                   <p>Item condition : {this.props.selectedItem.itemCondition}</p>
                                   <p>Location : {this.props.selectedItem.location}</p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardBody>
                                <h4>Ballot Information</h4>  
                                    <p>Request count : {this.props.selectedItem.requestCount}</p> 
                                    <p>Ballot time : {this.props.selectedItem.approved ? 
                                        <div>{this.props.selectedItem.ballotTime}</div> 
                                        :<div> Still pending approval</div>}
                                    </p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardBody>
                                <h4>Donated by</h4>   
                                    <p>{this.props.selectedItem.userHandle}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

                {/**<div><h1>Item Details</h1>
                <h3>{this.props.selectedItem.itemName}</h3>
                <h3>{this.props.selectedItem.category}</h3>
                <h3>{this.props.selectedItem.userHandle}</h3>
                <h3>{this.props.selectedItem.ballotTime}</h3>
                <h3>{this.props.selectedItem.itemCondition}</h3>
                <h3>{this.props.selectedItem.imageUrl}</h3>
                <button onClick = {() => {this.handleRequestItem()}}>Request for item!</button> </div>*/}
            </MDBContainer>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.user.user,
        selectedItem : state.item.selectedItem,
        ui : state.ui
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getItem, requestItem, clearMessage, clearError}
    , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails)
//export default ItemDetails;