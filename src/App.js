import React , {Component} from 'react';
import Search from './components/Search/Search';
import './App.css';
import MapComp from './components/MapComp/MapComp';
import Offers from './components/Offers/Offers';
import axios from 'axios';
import classes from './App.module.css';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import { Modal, Button} from 'react-bootstrap';
import {Pagination} from '@material-ui/lab';
import {Switch, Route, Link} from "react-router-dom";
import {calculateBoundingBox, isWithinBoundingBox} from './util/LatLngUtil';
import config from './config';
import OfferDetails from './components/Offers/OfferDetails/OfferDetails';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions/index';

class  App extends Component {


state = {
    currentSearchRegion : {name:'Wrocław', boundingBox: calculateBoundingBox([17.0323709,51.1106956],15)},
    selectedPlace: {geometry: {coordinates: [17.0323709,51.1106956]}, properties:{housenumber: "", city: "Wroclaw", street: "Rynek", postcode: "50-116"}},
    // offers: [],
    // currentRouteToFetch: -1,
    hooveredOffer:{
      state: false,
      offerId: undefined
    },
    // routeType: 'foot',
    currentView: 'list',
    // totalPages: 0,
    // currentPage: 1,
    // numberOfOffers: 0,
    // category: '1',
    // sortBy: 'created.desc',
    // priceFrom: 0,
    // priceTo: 10000,
    // offersRequestState: {
    //   loading: true,
    //   responseCode: 0
    //     },

        routingRequestState: {
          loading: true,
          responseCode: 0
            },
            openTooFarAwayModal :false
}

onRecalculateRoutesHandler = (e)=>{
  e.preventDefault();
  this.setState({currentRouteToFetch:0,routingRequestState: {
    loading: true,
    responseCode: 0
      }});
}

onRetryButtonClicked = ()=> {
  // this.setState({offersRequestState:{loading: true, responseCode: 0}, offers: []});

  // let apiUrl = `${config.OFFERS_API_PREFIX}/api/offer/category/${this.state.category}/page?limit=5&page=${this.state.currentPage-1}&price_gte=${this.state.priceFrom}&price_lte=${this.state.priceTo}&sort_by=${this.state.sortBy}`;
  // axios.get(apiUrl, {timeout: config.OFFERS_API_TIMEOUT})
  // .then(res=> {
  //   let fetchedOffers = res.data.content.map(offer => {
  //       let o = {
      
  //         ...offer,
  //         calculationRequired:true
  
  //       }
  //       return o;
  //   }) 
  //   this.setState({offers : fetchedOffers, currentRouteToFetch:0,totalPages:res.data.totalPages, currentPage: res.data.number + 1, numberOfOffers: res.data.totalElements,
  //     offersRequestState: {loading: false,responseCode: res.status}});
  // }).catch(e=>{
  //   if (e.response) {
  //     this.setState({offersRequestState: {loading: false,responseCode: e.response.status}})
  //   } else if (e.request) {
  //     this.setState({offersRequestState: {loading: false,responseCode: 1001}});
  // }});

  let requestParams = {
    category:this.props.category,
    priceGte:this.props.priceFrom,
    priceLte:this.props.priceTo,
    sortBy : this.props.sortBy,
    pageNumber: this.state.currentPage-1,
    limit: 5
  }
  this.props.makeOffersPageRequest(requestParams);
}

// onSettingsChanged = (newSettings)=>{
//   let newPriceFrom = newSettings.priceFrom != '' ? newSettings.priceFrom : 0;
//   let newPriceTo = newSettings.priceTo != '' ? newSettings.priceTo : 10000;

//   this.setState({offersRequestState:{loading: true, responseCode: 0}, offers: [],category: newSettings.category,
//     sortBy: newSettings.sortBy,
//     priceFrom: newPriceFrom,
//     priceTo: newPriceTo,});


//   let apiUrl = `${config.OFFERS_API_PREFIX}/api/offer/category/${newSettings.category}/page?limit=5&page=0&price_gte=${newPriceFrom}&price_lte=${newPriceTo}&sort_by=${newSettings.sortBy}`;
//   axios.get(apiUrl, {timeout: config.OFFERS_API_TIMEOUT})
//   .then(res=> {
//     let fetchedOffers = res.data.content.map(offer => {
//         let o = {
      
//           ...offer,
//           calculationRequired:true
  
//         }
//         return o;
//     }) 
   

//     this.setState({offers : fetchedOffers, currentRouteToFetch:fetchedOffers.length >0? 0:-1,totalPages:res.data.totalPages, currentPage: res.data.number + 1, numberOfOffers: res.data.totalElements,
//       offersRequestState: {loading: false,responseCode: res.status},routingRequestState: {
//         loading: fetchedOffers.length>0? true:false,
//         responseCode: 0
//           }});
//   }).catch(e=>{
//     if (e.response) {
//       this.setState({offersRequestState: {loading: false,responseCode: e.response.status}})
//     } else if (e.request) {
//       this.setState({offersRequestState: {loading: false,responseCode: 1001}});
//   }});

// }


onChangePageHandler = (event, value) => {
  // this.setState({offersRequestState: {loading: true,responseCode: 0}, offers:[], currentPage:value,  routingRequestState: {
  //   loading: true,
  //   responseCode: 0
  //     }});


  /* let apiUrl = `${config.OFFERS_API_PREFIX}/api/offer/category/${this.state.category}/page?limit=5&page=${value-1}&price_gte=${this.state.priceFrom}&price_lte=${this.state.priceTo}&sort_by=${this.state.sortBy}`;
  axios.get(apiUrl,{timeout: config.OFFERS_API_TIMEOUT})
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
  }}); */
  let requestParams = {
    category:this.props.category,
    priceGte:this.props.priceFrom,
    priceLte:this.props.priceTo,
    sortBy : this.props.sortBy,
    pageNumber: value-1,
    limit: 5
  }
  this.props.makeOffersPageRequest(requestParams);
  
};

onChangeViewHandler = (e,newView) => {
  e.preventDefault();
  this.setState({currentView: newView});
}


onTargetMarketDragEndHanlder = (e)=>{
    if(isWithinBoundingBox(this.state.currentSearchRegion.boundingBox,[e.target._latlng.lng,e.target._latlng.lat])){
  let offersWithClearedRoutes = this.state.offers.map(offer=>
    {
    var temp = Object.assign({}, offer);
    temp.calculationRequired=true;
    temp.paths = null;
    return temp;
    });

  let newSelectedPlace = {
    properties: undefined,
    geometry: {coordinates: [e.target._latlng.lng,e.target._latlng.lat]},
    autocomplete: false
  }
  this.setState({selectedPlace: newSelectedPlace,currentRouteToFetch:0, offers: offersWithClearedRoutes})
  
  axios.get(config.MAP_API_PREFIX + `/api/place/reverse?lng=${e.target._latlng.lng}&lat=${e.target._latlng.lat}`,{timeout:config.MAP_API_TIMEOUT})
  .then(res=> {

    let newSelectedPlace = {
      ...res.data.features[0],
      autocomplete: false
    }
    this.setState({selectedPlace: newSelectedPlace});

  }).catch(e=>{
    this.setState({selectedPlace: {...this.state.selectedPlace, error: true}});
  })
    } else {
      this.setState({openTooFarAwayModal:true});
    }
}

selectedPlaceHandler = (feature) => {
  
  let newSelectedPlace = {...feature, autocomplete: true};
  if(!feature.error){

  let offersWithClearedRoutes = this.state.offers.map(offer=>
    {
      var temp = Object.assign({}, offer);
      temp.calculationRequired=true;
    temp.paths = null;
    return temp;
    });
  this.setState({selectedPlace: newSelectedPlace, currentRouteToFetch:0, offers: offersWithClearedRoutes})
  }else{
    this.setState({selectedPlace: newSelectedPlace});

  }
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
  // let apiUrl = `${config.OFFERS_API_PREFIX}/api/offer/category/${this.state.category}/page?limit=5&page=0&price_gte=${0}&price_lte=${10000}&sort_by=${this.state.sortBy}`;
  // axios.get(apiUrl,{timeout: config.OFFERS_API_TIMEOUT})
  // .then(res=> {
  //   let fetchedOffers = res.data.content.map(offer => {
  //       let o = {
  //         ...offer,
  //         calculationRequired:true
  //       }
  //       return o;
  //   }) 
  //   this.setState({offersRequestState: {loading: false,responseCode: res.status},offers : fetchedOffers, currentRouteToFetch:0,totalPages:res.data.totalPages, currentPage: res.data.number + 1, numberOfOffers: res.data.totalElements});
  //   this.props.onSuccessfulOffersPageRequest({offersRequestState: {loading: false,responseCode: res.status},offers : fetchedOffers, currentRouteToFetch:0,totalPages:res.data.totalPages, currentPage: res.data.number + 1, numberOfOffers: res.data.totalElements});
  // }).catch(e=>{
  //   if (e.response) {
  //     this.setState({offersRequestState: {loading: false,responseCode: e.response.status}})
  //   } else if (e.request) {
  //     this.setState({offersRequestState: {loading: false,responseCode: 1001}});
  // }});
  let requestParams = {
    category:this.props.category,
    priceGte:this.props.priceFrom,
    priceLte:this.props.priceTo,
    sortBy : this.props.sortBy,
    limit: 5,
    pageNumber: this.props.currentPage-1,
  }
  this.props.makeOffersPageRequest(requestParams);
}

componentDidUpdate(prevProps, prevState) {
  if(this.props.offers.length>0 && prevState.currentRouteToFetch !== this.props.currentRouteToFetch && this.props.currentRouteToFetch>=0) {
    setTimeout(() => { 
      let apiUrl = `${config.MAP_API_PREFIX}/api/route/${this.state.routeType}?fromLat=${this.state.offers[this.state.currentRouteToFetch].coordinates.lat}&fromLng=${this.state.offers[this.state.currentRouteToFetch].coordinates.lng}&toLat=${this.state.selectedPlace.geometry.coordinates[1]}&toLng=${this.state.selectedPlace.geometry.coordinates[0]}&depTime=2020-05-23T10:15:30`;
    axios.get(apiUrl,{timeout:config.MAP_API_TIMEOUT})
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

handleModalClose = ()=>{
  this.setState({openTooFarAwayModal:false})
}

handleModalOpen = ()=>{
  this.setState({openTooFarAwayModal:true})
}

  render(){

    let placeTooFarAwayModal = <Modal show={this.state.openTooFarAwayModal} onHide={this.handleModalClose}>
    <Modal.Header>
    <Modal.Title>Błąd!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
  <p> Wybrane miejsce znajduje się poza granicami {this.state.currentSearchRegion.name}</p>
  <p> Proszę, wybierz coś bliżej!</p>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.handleModalClose}>
    Zamknij
  </Button>
</Modal.Footer>

    </Modal>

    let header = this.state.currentView === 'list'? <Header/> : null;
    let offers = <Offers onRecalculateRoutesHandler={this.onRecalculateRoutesHandler} routingRequestState={this.state.routingRequestState} onRetryButtonClicked={this.onRetryButtonClicked} offersRequestState={this.state.offersRequestState} numberOfOffers={this.state.numberOfOffers} currentView={this.state.currentView} onChangeViewHandler={this.onChangeViewHandler} mode={this.state.routeType} onMouseLeaveHandler={this.onMouseLeaveHandler} onMouseOverOfferHandler={this.onMouseOverOfferHandler} data={this.state.offers}></Offers>;
    let settings = this.state.currentView === 'list'? <Settings onSettingsChanged={this.onSettingsChanged}/> : null;
    let search = this.state.currentView === 'list'? <Search  handleModalOpen={this.handleModalOpen} currentSearchRegion={this.state.currentSearchRegion} selectedPlace={this.state.selectedPlace} onRouteTypeChange={this.onRouteTypeChange} routeType={this.state.routeType} clicked={this.selectedPlaceHandler}></Search> : null;
    let map = <MapComp routeType={this.props.routeType} onTargetMarketDragEndHanlder={this.onTargetMarketDragEndHanlder} selectedPlace={this.state.selectedPlace} offers={this.props.offers} hooveredOffer={this.state.hooveredOffer}>
    </MapComp>
    let pagination = (<div className={classes.Pagination}>

    <div className={classes.pagination}>
    
          <Pagination color="primary" count={this.props.totalPages} page={this.props.currentPage} onChange={this.onChangePageHandler} />
    
    </div>
    
    </div>);


let homePage = (
<React.Fragment>
{search}
{settings}
{offers}
{map}
{pagination}
{placeTooFarAwayModal}
</React.Fragment>
);

  return (

<div className={this.state.currentView==='list' ? classes.Container : classes.ContainerMap}> 

{header}
<Switch>

          <Route exact path="/">   {homePage}</Route>
          <Route path="/contact">
            <p>contact hehe</p>
          </Route>
          <Route path="/offers/:id" component={OfferDetails}>
          

          </Route>
</Switch>
</div>
  );
  }
}



const mapStateToProps = state => {
  return {
    routeType: state.routeControls.currentRouteType,
    offers : state.offers.offers,
    currentPage : state.offers.currentPage,
    totalPages : state.offers.totalPages,
    category : state.settings.category,
    sortBy : state.settings.sortBy,
    priceFrom: state.settings.priceFrom,
    priceTo: state.settings.priceTo
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // onSuccessfulOffersPageRequest: (data)=> dispatch(actionTypes.onSuccessfulOffersPageRequest(data))
    makeOffersPageRequest : (requestParams) => dispatch(actionTypes.makeOffersPageRequest(requestParams))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
