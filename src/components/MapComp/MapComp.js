import React, { Component } from 'react';
import { Map, TileLayer, Marker, GeoJSON} from 'react-leaflet';

class MapComp extends Component {
  state = {
    zoom: 11
  }

  render() {
    let center = [this.props.selectedPlace.geometry.coordinates[1], this.props.selectedPlace.geometry.coordinates[0]]
    let selectedPlaceMarker = (<Marker position={center}></Marker>)
    let offersMarkers = this.props.offers.map(offer => <Marker position={[offer.coordinates.lat,offer.coordinates.lng]}></Marker>)
    let routes= null

    var offersWithRoute =this.props.offers.filter(offer => !offer.calculationRequired)
    if(offersWithRoute.length>0){
    routes = offersWithRoute.map(offer => 
       <GeoJSON data={{
        type: "Feature",
        geometry: {"coordinates": decodePath( offer.path.points, false), "type": "LineString"},
        properties: {style: {color: "#00cc33", weight: 6, opacity: 0.4}}
    }} /> );
    
  } 

    return (
      <React.Fragment>
          <Map center={center} zoom={this.state.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedPlaceMarker}
        {offersMarkers}
        {routes}
    </Map>
   
      </React.Fragment>
    )
  }
}


var decodePath = function (encoded, is3D) {
  var len = encoded.length;
  var index = 0;
  var array = [];
  var lat = 0;
  var lng = 0;
  var ele = 0;

  while (index < len) {
      var b;
      var shift = 0;
      var result = 0;
      do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
      } while (b >= 0x20);
      var deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
      } while (b >= 0x20);
      var deltaLon = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += deltaLon;

      if (is3D) {
          // elevation
          shift = 0;
          result = 0;
          do {
              b = encoded.charCodeAt(index++) - 63;
              result |= (b & 0x1f) << shift;
              shift += 5;
          } while (b >= 0x20);
          var deltaEle = ((result & 1) ? ~(result >> 1) : (result >> 1));
          ele += deltaEle;
          array.push([lng * 1e-5, lat * 1e-5, ele / 100]);
      } else
          array.push([lng * 1e-5, lat * 1e-5]);
  }
  console.log("decoded " + len);
  return array;
};

export default MapComp