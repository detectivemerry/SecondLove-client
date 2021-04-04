import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBCardHeader, MDBBadge, MDBIcon, MDBRow } from 'mdbreact';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardHeader>
          <MDBRow>
            <MDBIcon border='' icon="user" style ={{padding:'10px'}}/>
            <h5 style = {{padding: '5px'}}>{post.userHandle}</h5>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardImage className="img-fluid" src={post.imageUrl} waves />
        <MDBCardBody>
          <MDBCardTitle>{post.itemName}</MDBCardTitle>
          <MDBCardText>
            Item condition: {post.itemCondition}
            <br />
            Item ballot status: {post.itemStatus}
            {/* Item id: {post.itemId} */}
          </MDBCardText>
          <MDBBtn outline color="pink" href={`/itemDetails/${post.itemId}`} >View</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <br/>
    </MDBCol>
  )
}

export default Card;
