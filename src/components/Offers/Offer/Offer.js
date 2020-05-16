import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


function Offer(props) {
    let spinner = null;
    let routeInfo = null;
    if(props.data.calculationRequired){
        spinner=<CircularProgress />
    } else {
        routeInfo = <span>{Math.round(props.data.path.time/(1000 * 60) * 100) / 100}min, {Math.round((props.data.path.distance/1000) * 100) / 100 }km</span>
        
    }
    return (
    <div>
       {props.data.name}, {props.data.address}, time: {spinner} {routeInfo}
    </div>
    )
}

export default Offer;