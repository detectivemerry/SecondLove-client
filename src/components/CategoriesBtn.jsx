import React, { Fragment } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

const ButtonPage = ({posts}) => {
  let onSubmit = (e) => {
    //console.log(e.target.id);
    posts(e.target.id);
  }

  return (
    <Fragment>
      <MDBBtn id = 'home and living' onClick = {onSubmit} outline color="pink">
        <MDBIcon  icon="utensils" className="mr-1" /> Home and Living
      </MDBBtn>

      <MDBBtn id ='sports' outline color="pink" onClick= {onSubmit}>
        <MDBIcon icon="bicycle" className="ml-1" /> Sports
      </MDBBtn>

      <MDBBtn id = 'electronic' outline color="pink" onClick={onSubmit}>
        <MDBIcon icon="laptop" className="mr-1" /> Electronic
      </MDBBtn>

      <MDBBtn outline color="pink" id = 'toys' onClick={onSubmit}>
        <MDBIcon icon="gamepad" className="mr-1" /> Toys
      </MDBBtn>

      <MDBBtn outline color="pink" id = 'clothes' onClick={onSubmit}>
        <MDBIcon icon="tshirt" className="mr-1" /> Clothes
      </MDBBtn>

      <MDBBtn outline color="pink" id = 'luxury' onClick={onSubmit}>
        <MDBIcon icon="gem" className="mr-1" /> Luxury
      </MDBBtn>

      <MDBBtn outline color="pink" id = 'automobile' onClick={onSubmit}>
        <MDBIcon icon="car-side" className="mr-1" /> Automobile
      </MDBBtn>
      
    </Fragment>
  );
}

export default ButtonPage;