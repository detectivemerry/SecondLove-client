import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 1.29,
      lng: 103.85
    },
    zoom: 14
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA7UYITtdux3_kJzsFhO8r5Mom0bfXgyXU' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* {this.props.places.map(x => {
            return (
              <AnyReactComponent
                lat={x.lat}
                lng={x.long}
                text={x.placename}
              />
            )
          })} */}
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;