import React, {Component, Suspense} from "react";
import OfferDetailPage from "./components/Offers/OfferDetail/OfferDetailPage";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home/HomeComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './i18n';

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
                <Suspense fallback={null}>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/contact">
                        <ImageGallery items={images}/>
                    </Route>
                    <Route path="/offers/:id" component={OfferDetailPage}></Route>
                </Suspense>
            </Switch>
        );
    }
}

export default App;
