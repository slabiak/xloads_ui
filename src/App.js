import React, {Component} from "react";
import OfferDetails from "./components/Offers/OfferDetails/OfferDetails";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home/HomeComponent";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/contact">
                    <p>contact hehe</p>
                </Route>
                <Route path="/offers/:id" component={OfferDetails}></Route>
            </Switch>
        );
    }
}

export default App;
