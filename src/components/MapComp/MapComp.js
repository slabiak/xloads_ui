import React, { Component } from 'react';
import { Map, TileLayer, Marker, GeoJSON, Circle, ZoomControl} from 'react-leaflet';
import OfferModal from '../Offers/OfferModal/OfferModal';
import iconTarget from '../../UI/marker/iconTarget';
import Zoomcontrol from 'react-leaflet';
import classes from './MapComp.module.css';

class MapComp extends Component {
  state = {
    zoom: 13,
    colors : ['grey','#73c93e'],
    showModal : false,
    modalOffer: null,
    hoveredMarker: {
      state: false,
      offerId: undefined
    }
  }

  markerClickedHandler = (id) => {
    let offer = this.props.offers.filter(offer=>offer.id===id);
    this.setState({showModal:true, modalOffer: offer[0]});
  }

  onModalHideHandler = ()=>{
    this.setState({showModal:false});
  }

  onMouseOverMarkerHandler = (id)=>{
    this.setState({hoveredMarker:{
      state: true,
      offerId: id
    }})
   // console.log('nad markerem nr' + this.state.hoveredMarker.offerId);
  }

  onMouseOutOfMarkerHandler = () => {
    this.setState({hoveredMarker:{
      state: false,
      offerId: undefined
    }})
  }
  zoomChangeHandler = (e)=>{
    this.setState({zoom:e._zoom})
  }

  render() {
    
    let center = [this.props.selectedPlace.geometry.coordinates[1], this.props.selectedPlace.geometry.coordinates[0]]
    let selectedPlaceMarker = (<Marker draggable={true} ondragend={(e)=>this.props.onTargetMarketDragEndHanlder(e)} icon={iconTarget} position={center}></Marker>)
    let offersMarkers = this.props.offers.map(offer => <Marker onmouseout={this.onMouseOutOfMarkerHandler} onmouseover={()=>this.onMouseOverMarkerHandler(offer.id)} onclick={()=>this.markerClickedHandler(offer.id)} key={offer.id} position={[offer.coordinates.lat,offer.coordinates.lng]}></Marker>)
    let routes= null
    var offersWithRoute =this.props.offers.filter(offer => !offer.calculationRequired)
    if(offersWithRoute.length>0){
    routes = offersWithRoute.map(offer => 
      {
       let routeStyle = {color: this.state.colors[0], weight: 4, opacity: 1};
       if((this.props.hooveredOffer.state ==true && this.props.hooveredOffer.offerId==offer.id) || (this.state.hoveredMarker.state==true &&this.state.hoveredMarker.offerId == offer.id)){
       routeStyle = {color: this.state.colors[1], weight: 6, opacity: 1};
       }
      let route = null;
      if(this.props.routeType==='transit'){  

        if(offer.paths[0].mode==='transit' ){
        route = offer.paths[0].sections.map(section=>{
          if((this.props.hooveredOffer.state ==true && this.props.hooveredOffer.offerId==offer.id) || (this.state.hoveredMarker.state==true &&this.state.hoveredMarker.offerId == offer.id)){
          if(section.mode==='WALK'){
            routeStyle = {color: 'black', weight: 4, opacity: 1, dashArray: '1,10'};
          } 
          else {
            routeStyle = {color: this.state.colors[1], weight: 6, opacity: 1};
          }
        }
          return <GeoJSON key={offer.id + routeStyle.color + section.value[0]+section.value[1]} data={{
            type: "LineString",
            coordinates: decodePath(section.value,false)}
        } style = {routeStyle}/>
        });
      } else {
        route = null;
      }
      
      } else {
        route =<GeoJSON key={offer.id + routeStyle.color} data={{
          type: "Feature",
          geometry: {"coordinates": decodePath( offer.paths[0].sections[0].value, false), "type": "LineString"}
          
      }} style = {routeStyle}
      /> ;
      }
      return route}
     );

     
  } 

  let modal = null;
  if(this.state.showModal){
   modal=<OfferModal onModalHideHandler={this.onModalHideHandler} show={this.state.showModal} offer={this.state.modalOffer} />
  }
    return (
      <div className={classes.Map}>
          <Map center={center} zoom={this.state.zoom} zoomControl={false} onzoomend={(e)=>{this.zoomChangeHandler(e);
          //console.log(e)
          }}>
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/positron/{z}/{x}/{y}.png?key=u2fRkDnGTO0UDCKhxIIF"
        />
        {selectedPlaceMarker}
        {offersMarkers}
        {routes}
        {/* <Circle center={center} radius={5000}/>  */}
        {this.props.children}
        <ZoomControl position={'bottomright'}></ZoomControl>
    </Map>
      {modal}
     
      </div>
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
//  console.log("decoded " + len);
  return array;
};

export default MapComp