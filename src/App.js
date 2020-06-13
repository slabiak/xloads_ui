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


class  App extends Component {

  backendPrefix = 'http://13.70.192.93:8087/';
// backendPrefix = 'http://localhost:8087/'

state = {
  selectedPlace: {geometry: {coordinates: [17.0312014,51.1104557]}, address: '50-107 Wroclaw, Rynek'},
  offers : [
    {id:1,created:1591523762000, name: 'Pokój jednoosobowy w mieszkaniu studenckim Wysoki standard',img:'https://ireland.apollo.olxcdn.com/v1/files/hqdhhbhhg8as3-PL/image;s=644x461', address: 'Wrocław ul. Ptasia 11', coordinates: {lat: 51.121591, lng:17.029357},calculationRequired: true, paths:null},
    {id:2,created:1591523752000, name: 'Promocja!!! Pokoj przy skytower/Room next to skytower.',img:'https://ireland.apollo.olxcdn.com/v1/files/6gzyp1j42xzo3-PL/image;s=644x461', address: 'Wrocław ul. Piwna 20', coordinates: {lat: 51.113956, lng:17.054883}, calculationRequired: true, paths:null},
    {id:3,created:1591523712000, name: 'Pokój 24m2 w ładnym standardzie', address: 'Wrocław ul. Makowa 33', img:'https://ireland.apollo.olxcdn.com/v1/files/6gzyp1j42xzo3-PL/image;s=644x461', coordinates: {lat: 51.092955, lng:16.990682}, calculationRequired: true, paths:null},
    {id:4,created:1591514712000, name: 'OKAZJA 800 zł pokój 2-osobowy z balkonem na Biskupinie', img:'https://ireland.apollo.olxcdn.com/v1/files/20mytks0glf01-PL/image;s=644x461', address: 'Wrocław ul. Czarnieckiego 58', coordinates: {lat: 51.115950, lng:17.005621}, calculationRequired: true, paths:null},
    {id:5,created:1591513562000,name: 'Pokój 1 osobowy koło Magnolii z ogródkiem', img:'https://ireland.apollo.olxcdn.com/v1/files/qwaxabjjcj14-PL/image;s=644x461', address: 'Wrocław ul. Kamienicka 40', coordinates: {lat: 51.078850, lng:17.061696}, calculationRequired: true, paths:null}
    ],
    currentRouteToFetch: 0,
    hooveredOffer:{
      state: false,
      offerId: undefined
    },
    routeType: 'foot'
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
 // console.log('did mount');
  setTimeout(() => {  
   let apiUrl = `${this.backendPrefix}route/${this.state.routeType}?fromLat=${this.state.offers[0].coordinates.lat}&fromLng=${this.state.offers[0].coordinates.lng}&toLat=${this.state.selectedPlace.geometry.coordinates[1]}&toLng=${this.state.selectedPlace.geometry.coordinates[0]}&depTime=2020-05-23T10:15:30`;
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
   // console.log('calculating route for offer number ' + this.state.currentRouteToFetch);
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
   
   {/* <div className={classes.Header}>
  header
</div> */}

<div className={classes.MyContainer}> 

<Offers mode={this.state.routeType} onMouseLeaveHandler={this.onMouseLeaveHandler} onMouseOverOfferHandler={this.onMouseOverOfferHandler} data={this.state.offers}></Offers> 
<div className={classes.Header}>
   <button type="button" className="btn btn-success btn-sm">Dodaj ogłoszenie</button>
</div>

<div className={classes.RightPane}>
  {/* <Search selectedPlace={this.state.selectedPlace} onRouteTypeChange={this.onRouteTypeChange} routeType={this.state.routeType} clicked={this.selectedPlaceHandler}></Search>  */}
 
    <MapComp routeType={this.state.routeType} onTargetMarketDragEndHanlder={this.onTargetMarketDragEndHanlder} selectedPlace={this.state.selectedPlace} offers={this.state.offers} hooveredOffer={this.state.hooveredOffer}>
    <Search selectedPlace={this.state.selectedPlace} onRouteTypeChange={this.onRouteTypeChange} routeType={this.state.routeType} clicked={this.selectedPlaceHandler}></Search> 

</MapComp>
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
    </React.Fragment>

  );
  }
}

export default App;
