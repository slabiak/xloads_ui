import React, {Component} from "react";
import OfferDetails from "./components/Offers/OfferDetails/OfferDetails";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home/HomeComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

class App extends Component {

    render() {
        const images = [
            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1015/1000/600/',
                thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1019/1000/600/',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
        ];


        return (
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/contact">
                    {/*<p>contact hehe</p>*/}
                    <ImageGallery items={images}/>
                </Route>
                <Route path="/offers/:id" component={OfferDetails}></Route>
            </Switch>
        );
    }
}

export default App;
