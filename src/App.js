import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBFooter, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
//import { ReactComponent as Logo } from './assets/logo.svg';
import Routes from './router/Routes';
import Store from './Redux/Store/Store';
import { Provider } from 'react-redux';
import Navbar from './components/NavBar'
import AdminNavbar from './components/AdminNavbar'
import UserNavbar from './components/UserNavbar'
import GuestNavbar from './components/GuestNavbar'
import {connect} from 'react-redux'
import History from './components/History'
import jwtDecode from 'jwt-decode';

class App extends Component {

  render() {
    let authenticated;
    const token = localStorage.FBIdToken
    if(token){
      const decodedToken = jwtDecode(token)
      if(decodedToken.exp * 1000 < Date.now()){
        authenticated = false
        
      }
      else{
        authenticated = true
      }
    }
    return (
      <Provider store={Store}>
        <Router history = {History}>
        {/**< Navbar />  :=D */}
          {authenticated &&
           this.props.user.isAdmin && <AdminNavbar/>}
          {authenticated &&
          !this.props.user.isAdmin && <UserNavbar />}
          {!authenticated && <GuestNavbar />}
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
      item : state.item.items,
      user : state.user
  }
}
export default connect(mapStateToProps)(App)

