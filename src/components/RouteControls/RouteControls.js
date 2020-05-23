 import React from 'react'
 import classes from './RouteControls.module.css';
 import carIcon from './../../img/car.png';
import tramIcon from './../../img/tram.png';
import footIcon from './../../img/foot.png';

 function RouteControls (props) {
        return (
            <div style={{display:'inline'}}>
            <button onClick={()=>props.onRouteTypeChange('car')} className={props.activeRouteType === 'car' ? classes.ActiveButton: classes.InactiveButton}><img style={{height:'30px'}} src={carIcon}></img></button>
            <button onClick={()=>props.onRouteTypeChange('transit')} className={props.activeRouteType === 'transit' ? classes.ActiveButton: classes.InactiveButton}><img style={{height:'30px'}} src={tramIcon}></img></button>
            <button onClick={()=>props.onRouteTypeChange('foot')} className={props.activeRouteType === 'foot' ? classes.ActiveButton: classes.InactiveButton}><img style={{height:'30px'}} src={footIcon}></img></button>
            </div>
        )
 }

 export default RouteControls;