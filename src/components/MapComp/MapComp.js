import React, {Component} from 'react';
import {GeoJSON, Map, Marker, TileLayer, ZoomControl} from 'react-leaflet';
import OfferModal from '../Offers/OfferModal/OfferModal';
import iconTarget from '../../UI/marker/iconTarget';
import classes from './MapComp.module.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import {isWithinBoundingBox} from '../../util/LatLngUtil';
import axios from 'axios';
import config from '../../config';


class MapComp extends Component {
    state = {
        zoom: 12,
        colors: ['grey', '#73c93e'],
        showModal: false,
        modalOffer: null,
        hoveredMarker: {
            state: false,
            offerId: undefined
        }
    }

    markerClickedHandler = (id) => {
        // let offer = this.props.offers.filter(offer => offer.id === id);
        // this.setState({showModal: true, modalOffer: offer[0]});
    }

    onModalHideHandler = () => {
        this.setState({showModal: false});
    }

    onMouseOverMarkerHandler = (id) => {
        this.setState({
            hoveredMarker: {
                state: true,
                offerId: id
            }
        })
        // console.log('nad markerem nr' + this.state.hoveredMarker.offerId);
    }

    onMouseOutOfMarkerHandler = () => {
        this.setState({
            hoveredMarker: {
                state: false,
                offerId: undefined
            }
        })
    }
    zoomChangeHandler = (e) => {
        this.setState({zoom: e._zoom})
    }

    componentDidUpdate() {
        this.refs.map.leafletElement.invalidateSize();
    }

    render() {

        let center = [this.props.targetPlace.geometry.coordinates[1], this.props.targetPlace.geometry.coordinates[0]]
        let selectedPlaceMarker = (<Marker
            draggable={true}
            ondragend={(e) => {
                if (isWithinBoundingBox(this.props.currentSearchRegion.boundingBox, [e.target._latlng.lng, e.target._latlng.lat])) {
                    // this.props.onTargetMarketDragEndHanlder(e)
                    // clearOffersRoutes : ()=> dispatch(actionTypes.clearOffersRoutes())
                    let newSelectedPlace = {
                        properties: undefined,
                        geometry: {coordinates: [e.target._latlng.lng, e.target._latlng.lat]},
                        autocomplete: false
                    }
                    this.props.setTargetPlace(newSelectedPlace);
                    this.props.clearOffersRoutes();
                    axios.get(config.MAP_API_PREFIX + `/api/place/reverse?lng=${e.target._latlng.lng}&lat=${e.target._latlng.lat}`, {timeout: config.MAP_API_TIMEOUT})
                        .then(res => {

                            let newSelectedPlace = {
                                ...res.data.features[0],
                                autocomplete: false
                            }
                            this.props.setTargetPlace(newSelectedPlace);

                        }).catch(e => {
                        this.props.setTargetPlace({...this.props.targetPlace, error: true});
                    })

                } else {
                    this.props.openTooFarAwayModal()
                }

            }
            }
            icon={iconTarget}
            position={center}>
        </Marker>)
        let offers = null;
        if(this.props.offerDetailView){
            offers =  this.props.offers.filter(offer=>offer.id==this.props.offerDetailId);
        } else {
            offers = this.props.offers;
        }
        let offersMarkers = offers.map(offer => <Marker onmouseout={this.onMouseOutOfMarkerHandler}
                                                                   onmouseover={() => this.onMouseOverMarkerHandler(offer.id)}
                                                                   onclick={() => this.markerClickedHandler(offer.id)}
                                                                   key={offer.id}
                                                                   position={[offer.coordinates.lat, offer.coordinates.lng]}></Marker>)
        let routes = null
        var offersWithRoute = offers.filter(offer => !offer.calculationRequired)
        if (offersWithRoute.length > 0) {
            routes = offersWithRoute.map(offer => {
                    let routeStyle = {color: this.state.colors[0], weight: 4, opacity: 1};
                    if ((this.props.hooveredOffer.state == true && this.props.hooveredOffer.offerId == offer.id) || (this.state.hoveredMarker.state == true && this.state.hoveredMarker.offerId == offer.id)) {
                        routeStyle = {color: this.state.colors[1], weight: 6, opacity: 1};
                    }
                    let route = null;
                    if (this.props.routeType === 'transit') {

                        if (offer.paths[0].mode === 'transit') {
                            route = offer.paths[0].sections.map(section => {
                                if ((this.props.hooveredOffer.state == true && this.props.hooveredOffer.offerId == offer.id) || (this.state.hoveredMarker.state == true && this.state.hoveredMarker.offerId == offer.id)) {
                                    if (section.mode === 'WALK') {
                                        routeStyle = {color: 'black', weight: 4, opacity: 1, dashArray: '1,10'};
                                    } else {
                                        routeStyle = {color: this.state.colors[1], weight: 6, opacity: 1};
                                    }
                                }
                                return <GeoJSON key={offer.id + routeStyle.color + section.value[0] + section.value[1]}
                                                data={{
                                                    type: "LineString",
                                                    coordinates: decodePath(section.value, false)
                                                }
                                                } style={routeStyle}/>
                            });
                        } else {
                            route = null;
                        }

                    } else {
                        route = <GeoJSON key={offer.id + routeStyle.color} data={{
                            type: "Feature",
                            geometry: {
                                "coordinates": decodePath(offer.paths[0].sections[0].value, false),
                                "type": "LineString"
                            }

                        }} style={routeStyle}
                        />;
                    }
                    return route
                }
            );


        }

        let modal = null;
        if (this.state.showModal) {
            modal = <OfferModal onModalHideHandler={this.onModalHideHandler} show={this.state.showModal}
                                offer={this.state.modalOffer}/>
        }


        return (
            <div className={classes.Map}>
                <Map ref='map' center={center} zoom={this.state.zoom} zoomControl={false} onzoomend={(e) => {
                    this.zoomChangeHandler(e);
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

const mapStateToProps = state => {
    return {
        currentSearchRegion: state.search.currentSearchRegion,
        targetPlace: state.search.targetPlace,
        offers: state.offers.offers,
        hooveredOffer: state.offers.hooveredOffer,
        routeType: state.routeControls.currentRouteType
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // setTargetPlace: (newTargetPlace)=> dispatch(actionTypes.changeR.setTargetPlace(newTargetPlace))
        openTooFarAwayModal: () => dispatch(actionTypes.openTooFarAwayModal()),
        clearOffersRoutes: () => dispatch(actionTypes.clearOffersRoutes()),
        setTargetPlace: (newTargetPlace) => dispatch(actionTypes.setTargetPlace(newTargetPlace)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComp);