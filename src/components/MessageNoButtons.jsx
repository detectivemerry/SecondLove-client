import React from "react";
import { clearMessage } from '../Redux/Actions/uiAction'
import {connect} from 'react-redux'
import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle} from 'mdbreact'

const Message = props => {

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Message</MDBCardTitle>
        <MDBCardText>
          {props.content}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};
 
export default Message