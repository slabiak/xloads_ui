import React, {useEffect} from "react";
import Search from "../Search/Search";
import MapComp from "../MapComp/MapComp";
import Offers from "../Offers/Offers";
import classes from "./HomeComponent.module.css";
import Header from "../Header/Header";
import Settings from "../Settings/Settings";
import {Button, Modal} from "react-bootstrap";
import {Pagination} from "@material-ui/lab";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions/index";

function HomeComponent(props) {

    const onChangePageHandler = (event, value) => {
        let requestParams = {
            category: props.category,
            priceGte: props.priceFrom,
            priceLte: props.priceTo,
            sortBy: props.sortBy,
            pageNumber: value - 1,
            limit: 5,
        };
        props.makeOffersPageRequest(requestParams);
    };

    useEffect(() => {
        let requestParams = {
            category: props.category,
            priceGte: props.priceFrom,
            priceLte: props.priceTo,
            sortBy: props.sortBy,
            limit: 5,
            pageNumber: props.currentPage - 1,
        };
        if (props.offers.length === 0) {
            props.makeOffersPageRequest(requestParams);
        }
    }, []);

    let placeTooFarAwayModal = (
        <Modal
            show={props.tooFarAwayModalOpened}
            onHide={props.hideTooFarAwayModal}
        >
            <Modal.Header>
                <Modal.Title>Błąd!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {" "}
                    Wybrane miejsce znajduje się poza granicami{" "}
                    {props.currentSearchRegion.name}
                </p>
                <p> Proszę, wybierz coś bliżej!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideTooFarAwayModal}>
                    Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    );

    let header = props.currentView === "list" ? <Header/> : null;
    let offers = (
        <Offers></Offers>
    );
    let settings = props.currentView === "list" ? <Settings/> : null;
    let search = props.currentView === "list" ? <Search></Search> : null;
    let map = (
        <MapComp view={props.currentView} hooveredOffer={props.hooveredOffer}></MapComp>
    );
    let pagination = (
        <div className={classes.Pagination}>
            <div className={classes.pagination}>
                <Pagination
                    color="primary"
                    count={props.totalPages}
                    page={props.currentPage}
                    onChange={onChangePageHandler}
                />
            </div>
        </div>
    );

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
        <div
            className={
                props.currentView === "list" ? classes.Container : classes.ContainerMap
            }
        >
            {header}
            {homePage}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        routeType: state.routeControls.currentRouteType,
        currentSearchRegion: state.search.currentSearchRegion,
        offers: state.offers.offers,
        currentPage: state.offers.currentPage,
        totalPages: state.offers.totalPages,
        category: state.settings.category,
        sortBy: state.settings.sortBy,
        priceFrom: state.settings.priceFrom,
        priceTo: state.settings.priceTo,
        tooFarAwayModalOpened: state.search.openTooFarAwayModal,
        currentView: state.settings.currentView
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeOffersPageRequest: (requestParams) =>
            dispatch(actionTypes.makeOffersPageRequest(requestParams)),
        hideTooFarAwayModal: () => dispatch(actionTypes.hideTooFarAwayModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
