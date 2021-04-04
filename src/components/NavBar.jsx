import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBFooter, 
    MDBNavLink, MDBIcon, MDBBtn, MDBContainer, MDBFormInline, MDBCol  } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../router/Routes';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../Redux/Actions/userAction'

class NavBar extends Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const { collapseID } = this.state;

    return (
        <Router>
          <div className='flyout'>
            <MDBNavbar color='rgba-pink-strong' dark expand='md' fixed='top' scrolling>
              <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
                <MDBIcon fab icon="gratipay" style = {{height: '1.5rem', width: '1.5rem'}} />
                <strong className='align-middle'>SecondLove</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler
                onClick={this.toggleCollapse('mainNavbarCollapse')}
              />
              <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} height = '30' navbar>
                
                <form id="searchQuery">
                    <input type="text" name="query" placeholder="search SecondLove"></input>
                    <input type="button" onclick={this.closeCollapse('mainNavbarCollapse')}to='/search' value="Search"></input>
                </form>
                
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink
                        onClick={this.closeCollapse('mainNavbarCollapse')}
                        to='/login'
                        >
                        <strong>Login</strong>
                        </MDBNavLink>
                    </MDBNavItem> 
                  
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/profile'
                    >
                      <strong>Profile</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/search'
                    >
                      <strong>Search</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/listing'
                    >
                       <strong>Listing</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/admin/approveItems'
                    > 
                      <strong>ApproveItems</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/admin/ballotItems'
                    > 
                      <strong>BallotItems</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/donation'
                    >
                      <strong>Donation</strong>
                    </MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/map'
                    >
                      <strong>Map</strong>
                    </MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink
                      onClick={() => {this.props.logoutUser(this.props.history)}}
                      to = '/'
                    >
                      <strong>Logout</strong>
                    </MDBNavLink>
                  </MDBNavItem>

                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            {collapseID && overlay}
            <main style={{ marginTop: '4rem' }}>
              <br />
              <Routes />
              <br/>
            </main>
            <MDBFooter color='rgba-pink-strong' >
              <p className='footer-copyright mb-0 py-3 text-center'>
                &copy; {new Date().getFullYear()} Copyright:
              <a href='https://www.MDBootstrap.com'> MDBootstrap.com </a>
              </p>
            </MDBFooter>
          </div>
        </Router>
    );
  }
}

const mapStateToProps = state => {
    return {
        item : state.item.items,
        user : state.user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({logoutUser} , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

