import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Search from '../pages/Search';
import Listing from '../pages/Listing';
import ApproveItems from '../pages/ApproveItems';
import BallotItems from '../pages/BallotItems';
import Donation from '../pages/Donation';
import Main from '../pages/Main'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import itemDetails from '../pages/ItemDetails'
import DonationSummary from '../pages/DonationSummary'
import RequestSummary from '../pages/RequestSummary'
import Map from '../pages/Map'


class Routes extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/search' component={Search} />
        <Route path='/listing' component={Listing} />
        <Route exact path='/admin/approveItems' component={ApproveItems} />
        <Route exact path='/admin/ballotItems' component={BallotItems} />
        <Route path='/donation' component={Donation} />
        <Route path='/signup' component={Signup} />
        <Route exact path='/profile' component={Profile} />
        <Route path = '/itemDetails/:itemId' component = {itemDetails}/>
        <Route exact path = '/profile/donationSummary' component = {DonationSummary}/>
        <Route exact path = '/profile/requestSummary' component = {RequestSummary}/>
        <Route exact path = '/map' component = {Map}/>
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
