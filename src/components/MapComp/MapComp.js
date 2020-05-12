import React, { Component } from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';

class MapComp extends Component {
  state = {
    center: [51.1105742, 17.0296744],
    zoom: 14
  }

  render() {
    let center = null;
 
      if(this.props.selectedPlace){
        center = [this.props.selectedPlace.geometry.coordinates[1], this.props.selectedPlace.geometry.coordinates[0]]
      } else {
        center = this.state.center;
      }
    let selectedPlaceMarker = (<Marker position={center}></Marker>)
    let offersMarkers = this.props.offers.map(offer => <Marker position={[offer.coordinates.lat,offer.coordinates.lng]}></Marker>)
     


    return (
      <React.Fragment>
          <Map center={center} zoom={this.state.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedPlaceMarker}
        {offersMarkers}
    </Map>
   
      </React.Fragment>
    )
  }
}

export default MapComp