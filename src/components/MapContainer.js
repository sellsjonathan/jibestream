import React from 'react';
import { Map, Marker } from 'google-maps-react';

import SearchBar from './SearchBar';

export default class MapContainer extends React.Component {
  state = {
    position: null
  };

  mapRef = React.createRef();

  getPosition = mapPosition => this.setState({ position: mapPosition });

  render() {
    const { position } = this.state;
    return (
      <div>
        <SearchBar
          google={this.props.google}
          map={this.mapRef}
          getPosition={this.getPosition}
        />
        <main>
          <Map
            ref={this.mapRef}
            google={this.props.google}
            zoom={19}
            initialCenter={{
              lat: 43.654383,
              lng: -79.426273
            }}
            center={position}
            centerAroundCurrentLocation={false}
          >
            <Marker position={position} />
          </Map>
        </main>
      </div>
    );
  }
}
