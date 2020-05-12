import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



function Offer(props) {
    let spinner = null;
    let time = null;
    if(props.data.calculationRequired){
        spinner=<CircularProgress />
    } else {
        time = <span>{props.data.time}</span>
    }
    return (
    <div>
        <p>{props.data.name}, {props.data.address}, time: {spinner} {time}</p>
    </div>
    )
}

export default Offer;