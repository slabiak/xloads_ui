import React , {Component} from 'react';
import Search from './components/Search/Search';
import './App.css';
import MapComp from './components/MapComp/MapComp';
import { Container, Row , Col} from 'react-bootstrap';
import { red } from '@material-ui/core/colors';
import Offers from './components/Offers/Offers';
import axios from 'axios';

class  App extends Component {

state = {
  selectedPlace: {geometry: {coordinates: [17.031870,51.110790]}},
  offers : [
    {id:1, name: 'Oferta1', address: 'Wrocław ul. Ukryta 15', coordinates: {lat: 51.1176883, lng:17.0532973},calculationRequired: true, path:null},
    {id:2,name: 'Oferta2', address: 'Wrocław ul. Pielęgniarska 14', coordinates: {lat: 51.1725556, lng:17.0083814}, calculationRequired: true, path:null},
    {id:3,name: 'Oferta3', address: 'Wrocław Pl. Anielewicza Mordechaja 105', coordinates: {lat: 51.0845144, lng:16.9991326}, calculationRequired: true, path:null},
    // {name: 'Oferta4', address: 'Wrocław ul. Świętokrzyska 36', coordinates: {lat: 51.1176883, lng:17.0532973}},
    // {name: 'Oferta5', address: 'Wrocław ul. Ptasia 15', coordinates: {lat: 51.1176883, lng:17.0532973}},
    // {name: 'Oferta6', address: 'Wrocław ul. Czarnieckiego 50', coordinates: {lat: 51.1176883, lng:17.0532973}},
    // {name: 'Oferta7', address: 'Wrocław ul. Tęczowa 29', coordinates: {lat: 51.1176883, lng:17.0532973}},
    // {name: 'Oferta8', address: 'Wrocław ul. Brązowa 5', coordinates: {lat: 51.1176883, lng:17.0532973}},
    // {name: 'Oferta9', address: 'Wrocław ul. Ołowiana 10', coordinates: {lat: 51.1176883, lng:17.0532973}}
    ],
    currentRouteToFetch: 0
}

selectedPlaceHandler = (feature) => {
  let clearOffers = this.state.offers.map(offer=>
    {
      var temp = Object.assign({}, offer);
      temp.calculationRequired=true;
    temp.path = null;
    return temp;
    });
  this.setState({selectedPlace:feature, currentRouteToFetch:0, offers: clearOffers})
}

componentDidMount(){
  console.log('did mount');
  axios.get(`https://graphhopper.com/api/1//route?point=${this.state.offers[0].coordinates.lat}%2C${this.state.offers[0].coordinates.lng}&point=${this.state.selectedPlace.geometry.coordinates[1]}%2C${this.state.selectedPlace.geometry.coordinates[0]}&type=json&locale=pl-PL&vehicle=car&weighting=fastest&key=0dc4f299-a491-452f-97e0-515c296c9453&turn_costs=true`)
  .then(res=> {
    let offersCopy = this.state.offers;
    let stOffer = offersCopy[0];
    stOffer.path = res.data.paths[0];
    stOffer.calculationRequired = false;
    offersCopy[0] = stOffer;
    if(this.state.offers.length>1){
    this.setState({offers : offersCopy, currentRouteToFetch: 1})
    } else {
      this.setState({offers : offersCopy})
    }
  })
}

componentDidUpdate(prevProps, prevState) {
  if(prevState.currentRouteToFetch !== this.state.currentRouteToFetch) {
    console.log('calculating route for offer number ' + this.state.currentRouteToFetch);
    axios.get(`https://graphhopper.com/api/1//route?point=${this.state.offers[this.state.currentRouteToFetch].coordinates.lat}%2C${this.state.offers[this.state.currentRouteToFetch].coordinates.lng}&point=${this.state.selectedPlace.geometry.coordinates[1]}%2C${this.state.selectedPlace.geometry.coordinates[0]}&type=json&locale=pl-PL&vehicle=car&weighting=fastest&key=0dc4f299-a491-452f-97e0-515c296c9453&turn_costs=true`)
    .then(res=> {
      let offersCopy = this.state.offers;
      let stOffer = offersCopy[this.state.currentRouteToFetch];
      stOffer.path = res.data.paths[0];
      stOffer.calculationRequired = false;
      offersCopy[this.state.currentRouteToFetch] = stOffer;
      let currentRouteToFetch = this.state.currentRouteToFetch;
      if(currentRouteToFetch<this.state.offers.length-1){
      this.setState({offers : offersCopy, currentRouteToFetch: currentRouteToFetch+1})
      } else {
        this.setState({offers : offersCopy})
      }
    })
  }
}

  render(){

  return (
    <Container>
      <Row> 
        <Col md={8}> <Offers data={this.state.offers}></Offers> </Col>
        <Col md={4}>
          <Row>
            <MapComp selectedPlace={this.state.selectedPlace} offers={this.state.offers}></MapComp>
          </Row>
          <Row>
            <Search clicked={this.selectedPlaceHandler}></Search>
          </Row>
        </Col> 
      </Row>
    </Container>

  );
  }
}

export default App;
