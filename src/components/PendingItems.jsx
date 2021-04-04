import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import GoogleMap from '../components/GoogleMap'

export default class PendingItems extends Component {
    state = {
        item: this.props.item.filter(x => x.approved === false).length ? this.props.item.filter(x => x.approved === false) : JSON.parse(localStorage.getItem('unapprovedItem')),
    }

    handleApprove = (itemid) => {
        this.props.approve(itemid);
    }

    display = this.state.item.map((eachItem) => {
        console.log("no. of unapproved items",this.props.item.filter(x => x.approved === false).length)
        return (
            <tr>
                <td><img src={eachItem.imageUrl}
                    width='200' height='200' className="img-fluid" alt="item image"></img></td>
                <td><div>Item name: {eachItem.itemName}</div>
//                     <div>Item condition: {eachItem.itemCondition}</div></td>
                <td>{eachItem.location}</td>
                <td>
                    <MDBBtn color="success" onClick={() =>this.handleApprove(eachItem.itemId)}>
                        <MDBIcon icon="check" className="mr-1" /> Approve
                                            </MDBBtn>
                    <MDBBtn color="danger">
                        <MDBIcon icon="times" className="mr-1" />Reject
                                            </MDBBtn></td>
            </tr>
        )
    })

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <div>
                            <h3>Pending Approval</h3>
                            <hr/>
                            <MDBTable striped>
                                <MDBTableHead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Item name and description</th>
                                        <th>Location</th>
                                        <th>Approve/Reject</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {this.display}
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
