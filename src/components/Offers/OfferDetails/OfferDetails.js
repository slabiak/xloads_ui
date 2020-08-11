import React from "react";
import { connect } from "react-redux";

function OfferDetails(props) {
  let offer = props.offers.filter(
    (offer) => offer.id == props.match.params.id
  )[0];
  if (offer != null) {
    return <p>{offer.title}</p>;
  } else {
    return "Brak danych";
  }
}

const mapStateToProps = (state) => {
  return {
    offers: state.offers.offers,
    routingRequestState: state.offers.routingRequestState,
    targetPlace: state.search.targetPlace,
    routeType: state.routeControls.currentRouteType,
  };
};

export default connect(mapStateToProps)(OfferDetails);
