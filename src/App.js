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
import classes from './App.module.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';

import { BrowserRouter as Router } from "react-router-dom";


class  App extends Component {

  backendPrefix = 'http://13.70.192.93:8087/';
  apiPrefix = 'http://localhost:8080/'
// backendPrefix = 'http://localhost:8087/'

// offers : [
//   {id:1,created:1591523762000, title: 'Pokój jednoosobowy w mieszkaniu studenckim Wysoki standard',images:['https://ireland.apollo.olxcdn.com/v1/files/hqdhhbhhg8as3-PL/image;s=644x461'], address: {
//     streetNumber: "11",
//     route: "ul. Ptasia",
//     city: "Wroclaw",
//     postalCode: "30-35"
//     }, coordinates: {lat: 51.121591, lng:17.029357},calculationRequired: true, paths:null},
//   {id:2,created:1591523752000, title: 'Promocja!!! Pokoj przy skytower/Room next to skytower.',images:['https://ireland.apollo.olxcdn.com/v1/files/6gzyp1j42xzo3-PL/image;s=644x461'], address: {
//     streetNumber: "20",
//     route: "ul. Piwna",
//     city: "Wroclaw",
//     postalCode: "30-35"
//     }, coordinates: {lat: 51.113956, lng:17.054883}, calculationRequired: true, paths:null},
//   {id:3,created:1591523712000, title: 'Pokój 24m2 w ładnym standardzie', address: {
//     streetNumber: "33",
//     route: "ul. Makowa",
//     city: "Wroclaw",
//     postalCode: "30-35"
//     }, images:['https://ireland.apollo.olxcdn.com/v1/files/6gzyp1j42xzo3-PL/image;s=644x461'], coordinates: {lat: 51.092955, lng:16.990682}, calculationRequired: true, paths:null},
//   {id:4,created:1591514712000, title: 'OKAZJA 800 zł pokój 2-osobowy z balkonem na Biskupinie', images:['https://ireland.apollo.olxcdn.com/v1/files/20mytks0glf01-PL/image;s=644x461'], address: {
//     streetNumber: "58",
//     route: "ul. Czarnieckiego",
//     city: "Wroclaw",
//     postalCode: "30-35"
//     }, coordinates: {lat: 51.115950, lng:17.005621}, calculationRequired: true, paths:null},
//   {id:5,created:1591513562000, title: 'Pokój 1 osobowy koło Magnolii z ogródkiem', images:['https://ireland.apollo.olxcdn.com/v1/files/qwaxabjjcj14-PL/image;s=644x461'], address: {
//     streetNumber: "40",
//     route: "ul. Kamienicka",
//     city: "Wroclaw",
//     postalCode: "30-35"
//     }, coordinates: {lat: 51.078850, lng:17.061696}, calculationRequired: true, paths:null}
//   ]

state = {
  selectedPlace: {geometry: {coordinates: [17.0312014,51.1104557]}, address: '50-107 Wroclaw, Rynek'},
    offers: [],
    currentRouteToFetch: -1,
    hooveredOffer:{
      state: false,
      offerId: undefined
    },
    routeType: 'foot',
    currentView: 'list'
}

onChangeViewHandler = (e,newView) => {
  e.preventDefault();
  this.setState({currentView: newView});
}


onTargetMarketDragEndHanlder = (e)=>{
  let newSelectedPlace = {
    address: 'dupa adres',
    geometry: {coordinates: [e.target._latlng.lng,e.target._latlng.lat]},
    autocomplete: false
  }
  let clearOffers = this.state.offers.map(offer=>
    {
    var temp = Object.assign({}, offer);
    temp.calculationRequired=true;
    temp.paths = null;
    return temp;
    });
  //this.setState({selectedPlace: newSelectedPlace,currentRouteToFetch:0, offers: clearOffers})
  
  axios.get(`http://photon.komoot.de/reverse?lon=${e.target._latlng.lng}&lat=${e.target._latlng.lat}`)
  .then(res=> {
    let newAddress = '';
    if(res.data.features[0].properties.postcode){
      newAddress = res.data.features[0].properties.postcode;
    } 
    if(res.data.features[0].properties.city){
      newAddress = newAddress + ' ' + res.data.features[0].properties.city;
    }
    if(res.data.features[0].properties.street){
      newAddress = newAddress + ', ' + res.data.features[0].properties.street
    } 
    if(res.data.features[0].properties.housenumber){
      newAddress = newAddress + ', ' + res.data.features[0].properties.housenumber
    }

    let newSelectedPlace = {
      address:  newAddress,
      geometry: {coordinates: [e.target._latlng.lng,e.target._latlng.lat]},
      autocomplete: false
    }
    let clearOffers = this.state.offers.map(offer=>
      {
      var temp = Object.assign({}, offer);
      temp.calculationRequired=true;
      temp.paths = null;
      return temp;
      });
    this.setState({selectedPlace: newSelectedPlace,currentRouteToFetch:0, offers: clearOffers});
    //console.log('new selected place is '+ currentSelectedPlace);
  })

}

selectedPlaceHandler = (feature) => {
  let clearOffers = this.state.offers.map(offer=>
    {
      var temp = Object.assign({}, offer);
      temp.calculationRequired=true;
    temp.paths = null;
    return temp;
    });
  this.setState({selectedPlace:{...feature, autocomplete: true}, currentRouteToFetch:0, offers: clearOffers})
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
  

  let apiUrl = `${this.apiPrefix}api/offer`;
  axios.get(apiUrl)
  .then(res=> {
    let fetchedOffers = res.data.map(offer => {
        let o = {
      
          ...offer,
          calculationRequired:true
  
        }
        return o;
    }) 
    this.setState({offers : fetchedOffers, currentRouteToFetch:0});
  });
  //  let apiUrl = `${this.backendPrefix}route/${this.state.routeType}?fromLat=${this.state.offers[0].coordinates.lat}&fromLng=${this.state.offers[0].coordinates.lng}&toLat=${this.state.selectedPlace.geometry.coordinates[1]}&toLng=${this.state.selectedPlace.geometry.coordinates[0]}&depTime=2020-05-23T10:15:30`;
  //   axios.get(apiUrl)
  //   .then(res=> {
  //     let offersCopy = this.state.offers;
  //     let stOffer = offersCopy[0];
  //     stOffer.paths = res.data;
  //     stOffer.calculationRequired = false;
  //     offersCopy[0] = stOffer;
  //     if(this.state.offers.length>1){
  //     this.setState({offers : offersCopy, currentRouteToFetch: 1})
  //     } else {
  //       this.setState({offers : offersCopy})
  //     }
  //   })

   

}

componentDidUpdate(prevProps, prevState) {
  if(prevState.currentRouteToFetch !== this.state.currentRouteToFetch) {
    setTimeout(() => { 
      let apiUrl = `${this.backendPrefix}route/${this.state.routeType}?fromLat=${this.state.offers[this.state.currentRouteToFetch].coordinates.lat}&fromLng=${this.state.offers[this.state.currentRouteToFetch].coordinates.lng}&toLat=${this.state.selectedPlace.geometry.coordinates[1]}&toLng=${this.state.selectedPlace.geometry.coordinates[0]}&depTime=2020-05-23T10:15:30`;
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

  
    let header = this.state.currentView === 'list'? <Header/> : null;
    let offers = <Offers currentView={this.state.currentView} onChangeViewHandler={this.onChangeViewHandler} mode={this.state.routeType} onMouseLeaveHandler={this.onMouseLeaveHandler} onMouseOverOfferHandler={this.onMouseOverOfferHandler} data={this.state.offers}></Offers>;
    let settings = this.state.currentView === 'list'? <Settings/> : null;
    let search = this.state.currentView === 'list'? <Search selectedPlace={this.state.selectedPlace} onRouteTypeChange={this.onRouteTypeChange} routeType={this.state.routeType} clicked={this.selectedPlaceHandler}></Search> : null;

  return (
    <Router>
   
   {/* <div className={classes.Header}>
  header
</div> */}

<div className={this.state.currentView==='list' ? classes.Container : classes.ContainerMap}> 
{header}
{search}
{settings}
{offers}
<MapComp routeType={this.state.routeType} onTargetMarketDragEndHanlder={this.onTargetMarketDragEndHanlder} selectedPlace={this.state.selectedPlace} offers={this.state.offers} hooveredOffer={this.state.hooveredOffer}>
</MapComp>

<div className={classes.Pagination}>

<div className={classes.pagination}>
<a href="#">&laquo;</a>
<a className={classes.active} href="#">1</a>
<a href="#">2</a>
<a href="#">3</a>
<a href="#">4</a>
<a href="#">5</a>
<a href="#">6</a>
<a href="#">&raquo;</a>
</div>

</div>

</div>

{/* 
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
        <Col md={5}></Col>
        <Col md={7} >
          <div className='sticky-top' style={{top:'86px'}}>
        <Row>
          </Row>
        
          <Row>
            <RouteDetails paths={this.state.offers[0].paths != null? this.state.offers[0].paths:null}></RouteDetails>
          </Row>
         </div>
        </Col> 
      </Row>
    </Container> */}
</Router>
  );
  }
}

export default App;
