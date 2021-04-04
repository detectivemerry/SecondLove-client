import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBBtn, MDBCardImage, MDBCard} from 'mdbreact'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { BounceLoader, BeatLoader } from 'react-spinners'
import { css } from '@emotion/react'

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../Redux/Actions/userAction';
import GoogleMap from '../components/GoogleMap';

class Profile extends Component {

  componentDidMount(){
    this.props.getUserData()
  }

    render() {
      //Styling for loading
      const loaderCSS = css`
            margin-top : 25px;
            margin-bottom : 25px;
            margin-left : 550px;
        `
      return (
        <MDBContainer>
          {this.props.loading ? 
            <div>
            <BeatLoader 
                loading = {this.props.loading}
                size = {72}
                color = 'red'
                css = {loaderCSS}
                />
            </div>
            :
          <MDBRow>
              <MDBCol>
              <MDBCard>     
                  <MDBCol col-md-1>
                    <h2>Profile page</h2>
                    <h3>User Handle: {this.props.user.credentials.handle}</h3>
                    <MDBRow>
                      <Link to = "/profile/donationSummary">
                        <MDBBtn color="pink">View your donations</MDBBtn>
                      </Link>
                      <Link to = "/profile/requestSummary">
                      <MDBBtn color="pink">View your request summary</MDBBtn>
                      </Link>
                    </MDBRow>
                  </MDBCol>
                </MDBCard>
              </MDBCol>

              <MDBCol md = '3'>
                <MDBCard>
                <MDBCardImage className="img-fluid" src={this.props.user.credentials.imageUrl} waves />
                </MDBCard>
              </MDBCol>
                
          </MDBRow>
      }
      </MDBContainer>
      )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
  });
  
  Profile.propTypes = {
    user: PropTypes.object.isRequired,
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    { getUserData }
, dispatch);

  
  //export default connect(mapStateToProps)(Profile);
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)