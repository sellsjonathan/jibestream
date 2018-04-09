import React from 'react';
import './App.css';

// dependencies
import { GoogleApiWrapper } from 'google-maps-react';
// myComponents
import MapContainer from './components/MapContainer';

class App extends React.Component {
  render() {
    return <MapContainer google={this.props.google} />;
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD6YoAyro_AbPOafM-2zmjv6hwbc6ZxY-U'
})(App);
