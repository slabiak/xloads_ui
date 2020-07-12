import React , {Component} from 'react';
import Search from './components/Search/Search';
import './App.css';
import MapComp from './components/MapComp/MapComp';
import Offers from './components/Offers/Offers';
import axios from 'axios';
import classes from './App.module.css';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import {Pagination} from '@material-ui/lab';
import { BrowserRouter as Router } from "react-router-dom";


class  App extends Component {

  offersApiTimeout = 3000;
  routingApiTimeout = 3000;
  backendPrefix = 'http://13.70.192.93:8087/';
  apiPrefix = 'http://localhost:8080/'
// backendPrefix = 'http://localhost:8087/'

state = {
    selectedPlace: {geometry: {coordinates: [17.0312014,51.1104557]}, address: '50-107 Wroclaw, Rynek'},
    offers: [],
    currentRouteToFetch: -1,
    hooveredOffer:{
      state: false,
      offerId: undefined
    },
    routeType: 'foot',
    currentView: 'list',
    totalPages: 0,
    currentPage: 0,
    numberOfOffers: 0,
    category: '1',
    sortBy: 'created.desc',
    priceFrom: 0,
    priceTo: 10000,
    offersRequestState: {
      loading: true,
      responseCode: 0
        },
        routingRequestState: {
          loading: true,
          responseCode: 0
            }
}

onRecalculateRoutesHandler = (e)=>{
  e.preventDefault();
  this.setState({currentRouteToFetch:0,routingRequestState: {
    loading: true,
    responseCode: 0
      }});
}

onRetryButtonClicked = ()=> {
  this.setState({offersRequestState:{loading: true, responseCode: 0}, offers: []});

  let apiUrl = `${this.apiPrefix}api/offer/category/${this.state.category}/page?limit=5&page=${this.state.currentPage-1}&price_gte=${this.state.priceFrom}&price_lte=${this.state.priceTo}&sort_by=${this.state.sortBy}`;
  axios.get(apiUrl, {timeout: this.offersApiTimeout})
  .then(res=> {
    let fetchedOffers = res.data.content.map(offer => {
        let o = {
      
          ...offer,
          calculationRequired:true
  
        }
        return o;
    }) 
    this.setState({offers : fetchedOffers, currentRouteToFetch:0,totalPages:res.data.totalPages, currentPage: res.data.number + 1, numberOfOffers: res.data.totalElements,
      offersRequestState: {loading: false,responseCode: res.status}});
  }).catch(e=>{
    if (e.response) {
      this.setState({offersRequestState: {loading: false,responseCode: e.response.status}})
    } else if (e.request) {
      this.setState({offersRequestState: {loading: false,responseCode: 1001}});
  }});
}

onSettingsChanged = (newSettings)=>{
  let newPriceFrom = newSettings.priceFrom != '' ? newSettings.priceFrom : 0;
  let newPriceTo = newSettings.priceTo != '' ? newSettings.priceTo : 10000;

  this.setState({offersRequestState:{loading: true, responseCode: 0}, offers: [],category: newSettings.category,
    sortBy: newSettings.sortBy,
    priceFrom: newPriceFrom,
    priceTo: newPriceTo,});


  let apiUrl = `${this.apiPrefix}api/offer/category/${newSettings.category}/page?limit=5&page=0&price_gte=${newPriceFrom}&price_lte=${newPriceTo}&sort_by=${newSettings.sortBy}`;
  axios.get(apiUrl, {timeout: this.offersApiTimeout})
  .then(res=> {
    let fetchedOffers = res.data.content.map(offer => {
        let o = {
      
          ...offer,
          calculationRequired:true
  
        }
        return o;
    }) 
   

    this.setState({offers : fetchedOffers, currentRouteToFetch:fetchedOffers.length >0? 0:-1,totalPages:res.data.totalPages, currentPage: res.data.number + 1, numberOfOffers: res.data.totalElements,
      offersRequestState: {loading: false,responseCode: res.status},routingRequestState: {
        loading: fetchedOffers.length>0? true:false,
        responseCode: 0
          }});
  }).catch(e=>{
    if (e.response) {
      this.setState({offersRequestState: {loading: false,responseCode: e.response.status}})
    } else if (e.request) {
      this.setState({offersRequestState: {loading: false,responseCode: 1001}});
  }});

}


onChangePageHandler = (event, value) => {
  this.setState({offersRequestState: {loading: true,responseCode: 0}, offers:[], currentPage:value,  routingRequestState: {
    loading: true,
    responseCode: 0
      }});


  let apiUrl = `${this.apiPrefix}api/offer/category/${this.state.category}/page?limit=5&page=${value-1}&price_gte=${this.state.priceFrom}&price_lte=${this.state.priceTo}&sort_by=${this.state.sortBy}`;
  axios.get(apiUrl,{timeout: this.offersApiTimeout})
  .then(res=> {
    let fetchedOffers = res.data.content.map(offer => {
        let o = {
      
          ...offer,
          calculationRequired:true
  
        }
        return o;
    }) 
    this.setState({offers : fetchedOffers, currentRouteToFetch:0,totalPages:res.data.totalPages, currentPage: res.data.number+1, offersRequestState: {loading: false,responseCode: res.status}});
    window.scrollTo(0, 0)

  }).catch(e=>{
    if (e.response) {
      this.setState({offersRequestState: {loading: false,responseCode: e.response.status}})
    } else if (e.request) {
      this.setState({offersRequestState: {loading: false,responseCode: 1001}});
  }});
  
};

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
  this.setState({offers: clearOffers, routeType: newRouteType, currentRouteToFetch:this.state.offers.length >0? 0:-1,routingRequestState: {
    loading: this.state.offers.length >0 ? true:false,
    responseCode: 0
      }})
}

componentDidMount(){
  let apiUrl = `${this.apiPrefix}api/offer/category/${this.state.category}/page?limit=5&page=0&price_gte=${0}&price_lte=${10000}&sort_by=${this.state.sortBy}`;
  axios.get(apiUrl,{timeout: this.offersApiTimeout})
  .then(res=> {
    let fetchedOffers = res.data.content.map(offer => {
        let o = {
          ...offer,
          calculationRequired:true
        }
        return o;
    }) 
    this.setState({offersRequestState: {loading: false,responseCode: res.status},offers : fetchedOffers, currentRouteToFetch:0,totalPages:res.data.totalPages, currentPage: res.data.number + 1, numberOfOffers: res.data.totalElements});
  }).catch(e=>{
    if (e.response) {
      this.setState({offersRequestState: {loading: false,responseCode: e.response.status}})
    } else if (e.request) {
      this.setState({offersRequestState: {loading: false,responseCode: 1001}});
  }});
}

componentDidUpdate(prevProps, prevState) {
  if(this.state.offers.length>0 && prevState.currentRouteToFetch !== this.state.currentRouteToFetch && this.state.currentRouteToFetch>=0) {
    setTimeout(() => { 
      let apiUrl = `${this.backendPrefix}route/${this.state.routeType}?fromLat=${this.state.offers[this.state.currentRouteToFetch].coordinates.lat}&fromLng=${this.state.offers[this.state.currentRouteToFetch].coordinates.lng}&toLat=${this.state.selectedPlace.geometry.coordinates[1]}&toLng=${this.state.selectedPlace.geometry.coordinates[0]}&depTime=2020-05-23T10:15:30`;
    axios.get(apiUrl,{timeout:this.routingApiTimeout})
    .then(res=> {
      let offersCopy = this.state.offers;
      let stOffer = offersCopy[this.state.currentRouteToFetch];
      stOffer.paths = res.data;
      stOffer.calculationRequired = false;
      offersCopy[this.state.currentRouteToFetch] = stOffer;
      let currentRouteToFetch = this.state.currentRouteToFetch;
      if(currentRouteToFetch<this.state.offers.length-1){
      this.setState({offers : offersCopy, currentRouteToFetch: currentRouteToFetch+1,routingRequestState: {loading: true,responseCode: res.status}})
      } else {
        this.setState({offers : offersCopy,routingRequestState: {loading: false,responseCode: res.status}})
      }
    }).catch(e=>{
      if (e.response) {
        this.setState({routingRequestState: {loading: false,responseCode: e.response.status},currentRouteToFetch: -1})
      } else if (e.request) {
        this.setState({routingRequestState: {loading: false,responseCode: 1001},currentRouteToFetch: -1});
    }});
  }, 10);
  }
}



  render(){

  
    let header = this.state.currentView === 'list'? <Header/> : null;
    let offers = <Offers onRecalculateRoutesHandler={this.onRecalculateRoutesHandler} routingRequestState={this.state.routingRequestState} onRetryButtonClicked={this.onRetryButtonClicked} offersRequestState={this.state.offersRequestState} numberOfOffers={this.state.numberOfOffers} currentView={this.state.currentView} onChangeViewHandler={this.onChangeViewHandler} mode={this.state.routeType} onMouseLeaveHandler={this.onMouseLeaveHandler} onMouseOverOfferHandler={this.onMouseOverOfferHandler} data={this.state.offers}></Offers>;
    let settings = this.state.currentView === 'list'? <Settings onSettingsChanged={this.onSettingsChanged}/> : null;
    let search = this.state.currentView === 'list'? <Search inputValue={this.state.selectedPlace.address} selectedPlace={this.state.selectedPlace} onRouteTypeChange={this.onRouteTypeChange} routeType={this.state.routeType} clicked={this.selectedPlaceHandler}></Search> : null;

  return (
    <Router>
<div className={this.state.currentView==='list' ? classes.Container : classes.ContainerMap}> 
{header}
{search}
{settings}
{offers}
<MapComp routeType={this.state.routeType} onTargetMarketDragEndHanlder={this.onTargetMarketDragEndHanlder} selectedPlace={this.state.selectedPlace} offers={this.state.offers} hooveredOffer={this.state.hooveredOffer}>
</MapComp>

<div className={classes.Pagination}>

<div className={classes.pagination}>

      <Pagination color="primary" count={this.state.totalPages} page={this.state.currentPage} onChange={this.onChangePageHandler} />

</div>

</div>

</div>
</Router>
  );
  }
}

export default App;
