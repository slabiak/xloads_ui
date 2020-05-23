import React , {Component} from 'react';
import Search from './components/Search/Search';
import './App.css';
import MapComp from './components/MapComp/MapComp';
import { Container, Row , Col, Navbar, Nav, NavDropdown}  from 'react-bootstrap';
import { red } from '@material-ui/core/colors';
import Offers from './components/Offers/Offers';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import RouteDetails from './components/RouteDetails/RouteDetails';


class  App extends Component {

state = {
  selectedPlace: {geometry: {coordinates: [17.064855,51.107598]}},
  offers : [
    {id:1,name: 'Oferta1', address: 'Wrocław ul. Ptasia 11', coordinates: {lat: 51.121591, lng:17.029357},calculationRequired: true, paths:null},
    {id:2,name: 'Oferta2', address: 'Wrocław ul. Piwna 20', coordinates: {lat: 51.113956, lng:17.054883}, calculationRequired: true, paths:null},
    {id:3,name: 'Oferta3', address: 'Wrocław ul. Makowa 33', coordinates: {lat: 51.092955, lng:16.990682}, calculationRequired: true, paths:null},
    {id:4,name: 'Oferta4', address: 'Wrocław ul. Czarnieckiego 58', coordinates: {lat: 51.115950, lng:17.005621}, calculationRequired: true, paths:null},
    {id:5,name: 'Oferta5', address: 'Wrocław ul. Kamienicka 40', coordinates: {lat: 51.078850, lng:17.061696}, calculationRequired: true, paths:null}
    ],
    currentRouteToFetch: 0,
    hooveredOffer:{
      state: false,
      offerId: undefined
    },
    routeType: 'car'
}

onTargetMarketDragEndHanlder = (e)=>{
  let newSelectedPlace = {
    geometry: {coordinates: [e.target._latlng.lng,e.target._latlng.lat]}
  }
  let clearOffers = this.state.offers.map(offer=>
    {
      var temp = Object.assign({}, offer);
      temp.calculationRequired=true;
    temp.paths = null;
    return temp;
    });
  this.setState({selectedPlace: newSelectedPlace,currentRouteToFetch:0, offers: clearOffers})
}

selectedPlaceHandler = (feature) => {
  let clearOffers = this.state.offers.map(offer=>
    {
      var temp = Object.assign({}, offer);
      temp.calculationRequired=true;
    temp.paths = null;
    return temp;
    });
  this.setState({selectedPlace:feature, currentRouteToFetch:0, offers: clearOffers})
}

onMouseOverOfferHandler = (id)=>{
  this.setState({hooveredOffer: {
    state: true,
    offerId: id
  }})
}

onMouseLeaveHandler = ()=>{
  this.setState({hooveredOffer: {
    state: false,
    offerId: undefined
  }})
}

onRouteTypeChange = (newRouteType)=>{
  let clearOffers = this.state.offers.map(offer=>
    {
    var temp = Object.assign({}, offer);
    temp.calculationRequired=true;
    temp.paths = null;
    return temp;
    });
  this.setState({currentRouteToFetch:0, offers: clearOffers, routeType: newRouteType})
}

componentDidMount(){
  console.log('did mount');
  setTimeout(() => {  
   let apiUrl = `http://localhost:8087/route/${this.state.routeType}?fromLat=${this.state.offers[0].coordinates.lat}&fromLng=${this.state.offers[0].coordinates.lng}&toLat=${this.state.selectedPlace.geometry.coordinates[1]}&toLng=${this.state.selectedPlace.geometry.coordinates[0]}&depTime=2020-05-23T10:15:30`;
    axios.get(apiUrl)
    .then(res=> {
      let offersCopy = this.state.offers;
      let stOffer = offersCopy[0];
      stOffer.paths = res.data;
      stOffer.calculationRequired = false;
      offersCopy[0] = stOffer;
      if(this.state.offers.length>1){
      this.setState({offers : offersCopy, currentRouteToFetch: 1})
      } else {
        this.setState({offers : offersCopy})
      }
    })

   }, 10);

}

componentDidUpdate(prevProps, prevState) {
  if(prevState.currentRouteToFetch !== this.state.currentRouteToFetch) {
    console.log('calculating route for offer number ' + this.state.currentRouteToFetch);
    setTimeout(() => { 
      let apiUrl = `http://localhost:8087/route/${this.state.routeType}?fromLat=${this.state.offers[this.state.currentRouteToFetch].coordinates.lat}&fromLng=${this.state.offers[this.state.currentRouteToFetch].coordinates.lng}&toLat=${this.state.selectedPlace.geometry.coordinates[1]}&toLng=${this.state.selectedPlace.geometry.coordinates[0]}&depTime=2020-05-23T10:15:30`;
    axios.get(apiUrl)
    .then(res=> {
      let offersCopy = this.state.offers;
      let stOffer = offersCopy[this.state.currentRouteToFetch];
      stOffer.paths = res.data;
      stOffer.calculationRequired = false;
      offersCopy[this.state.currentRouteToFetch] = stOffer;
      let currentRouteToFetch = this.state.currentRouteToFetch;
      if(currentRouteToFetch<this.state.offers.length-1){
      this.setState({offers : offersCopy, currentRouteToFetch: currentRouteToFetch+1})
      } else {
        this.setState({offers : offersCopy})
      }
    })
  }, 10);
  }
}



  render(){

    const marks = [
      {
        value: 0,
        label: '1km',
      },
      {
        value: 50,
        label: '5km'
      },
      {
        value: 100,
        label: '10km',
      },
    ];

  return (
    <React.Fragment>
   <Navbar bg="light" expand="lg" style={{  position: 'sticky',top: 0, zIndex:100}}>
  <Navbar.Brand href="#home">Nazwa</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Strona główna</Nav.Link>
      <Nav.Link href="#link">Oferty</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    <Container >
      <Row> 
        <Col md={5}> <Offers onMouseLeaveHandler={this.onMouseLeaveHandler} onMouseOverOfferHandler={this.onMouseOverOfferHandler} data={this.state.offers}></Offers> </Col>
        <Col md={7} >
          <div className='sticky-top' style={{top:'86px'}}>
        <Row>
          <Search onRouteTypeChange={this.onRouteTypeChange} routeType={this.state.routeType} clicked={this.selectedPlaceHandler}></Search> 
          </Row>
          <Row>
            <MapComp routeType={this.state.routeType} onTargetMarketDragEndHanlder={this.onTargetMarketDragEndHanlder} selectedPlace={this.state.selectedPlace} offers={this.state.offers} hooveredOffer={this.state.hooveredOffer}></MapComp>
          </Row>
          <Row>
            {/* <RouteDetails paths={this.state.offers[0].paths != null? this.state.offers[0].paths:null}></RouteDetails> */}
          </Row>
         </div>
        </Col> 
      </Row>
    </Container>
    </React.Fragment>
  );
  }
}

export default App;
