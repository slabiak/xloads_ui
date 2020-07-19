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
    currentView: 'list'
}

onChangePageHandler = (event, value) => {
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

componentDidMount(){
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

  render(){

    let placeTooFarAwayModal = <Modal show={this.props.tooFarAwayModalOpened} onHide={this.props.hideTooFarAwayModal}>
    <Modal.Header>
    <Modal.Title>Błąd!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
  <p> Wybrane miejsce znajduje się poza granicami {this.props.currentSearchRegion.name}</p>
  <p> Proszę, wybierz coś bliżej!</p>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.props.hideTooFarAwayModal}>
    Zamknij
  </Button>
</Modal.Footer>

    </Modal>

    let header = this.state.currentView === 'list'? <Header/> : null;
    let offers = <Offers currentView={this.state.currentView} onChangeViewHandler={this.onChangeViewHandler}></Offers>;
    let settings = this.state.currentView === 'list'? <Settings/> : null;
    let search = this.state.currentView === 'list'? <Search></Search> : null;
    let map = <MapComp  view={this.state.currentView} hooveredOffer={this.state.hooveredOffer}>
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
    currentSearchRegion: state.search.currentSearchRegion,
    offers : state.offers.offers,
    currentPage : state.offers.currentPage,
    totalPages : state.offers.totalPages,
    category : state.settings.category,
    sortBy : state.settings.sortBy,
    priceFrom: state.settings.priceFrom,
    priceTo: state.settings.priceTo,
    tooFarAwayModalOpened : state.search.openTooFarAwayModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    makeOffersPageRequest : (requestParams) => dispatch(actionTypes.makeOffersPageRequest(requestParams)),
    hideTooFarAwayModal : () => dispatch(actionTypes.hideTooFarAwayModal())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
