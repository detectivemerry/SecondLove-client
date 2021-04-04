import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol,MDBBtn } from "mdbreact";
import ListingPic from '../components/ListingPic'

class Listing extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size = "8">
                        <h2>Listing </h2>
                        <ListingPic/>
                        <h5>Item description</h5>
                    </MDBCol>
                    <MDBCol size = "4">
                    <MDBBtn color="unique" size = "lg">Request</MDBBtn>

                    </MDBCol>
                    </MDBRow>
            </MDBContainer>


        )
    }
}
export default Listing