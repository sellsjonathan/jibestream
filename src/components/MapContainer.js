import React from 'react';
import { Map, Marker } from 'google-maps-react';

import Icon from './Icon';

export default class MapContainer extends React.Component {
  state = {
    position: null
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  onSubmit(event) {
    event.preventDefault();
  }

  renderAutoComplete() {
    const { google } = this.props;
    const gMap = this.mapRef.map;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', gMap);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        gMap.fitBounds(place.geometry.viewport);
      } else {
        gMap.setCenter(place.geometry.location);
        gMap.setZoom(17);
      }

      this.setState({ position: place.geometry.location });
    });
  }

  render() {
    const { position } = this.state;
    return (
      <div>
        <header className="searchContainer" onSubmit={this.onSubmit}>
          <div className="title">
            <h1>Jonathan Sells</h1>
            <h2>for Jibestream</h2>
          </div>
          <form>
            <input
              placeholder="Enter a location"
              type="text"
              ref={ref => (this.autocomplete = ref)}
            />
            <button type="submit">
              <Icon size="sm" /> <span>Search map</span>
            </button>
          </form>
        </header>
        <main>
          <Map
            ref={ref => (this.mapRef = ref)}
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
