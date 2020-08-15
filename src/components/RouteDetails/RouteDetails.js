import React from 'react';

function RouteDetails(props) {
    let routeDetails = <p>empty</p>

    if (props.paths != null) {
        let tramPaths = props.paths.filter(path => path.legs.length > 1);
        routeDetails =
            <div>
                <p>
                    przesiadki: {props.paths[0].transfers} <br/>
                    trampaths: {tramPaths.length} <br/>
                    {Math.round(props.paths[0].time / (1000 * 60) * 100) / 100} minut <br/>
                    {Math.round((props.paths[0].distance / 1000) * 100) / 100} km
                </p>
            </div>
    } else {
        routeDetails = <p>Still calculating</p>
    }
    return (
        <React.Fragment>
            {routeDetails}
        </React.Fragment>
    )
}


export default RouteDetails;