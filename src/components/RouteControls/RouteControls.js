 import React from 'react'
 import classes from './RouteControls.module.css';
 import carIcon from './../../img/car.png';
import tramIcon from './../../img/tram.png';
import footIcon from './../../img/foot.png';
import bikeIcon from './../../img/bike.png';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';



 function RouteControls (props) {
        return (
            <div style={{}}>
            <button onClick={()=>props.onChangeRouteType('foot')} className={props.currentRouteType === 'foot' ? classes.ActiveButton: classes.InactiveButton}><img style={{height:'30px'}} src={footIcon}></img></button>
            <button onClick={()=>props.onChangeRouteType('bike')} className={props.currentRouteType === 'bike' ? classes.ActiveButton: classes.InactiveButton}><img style={{height:'30px'}} src={bikeIcon}></img></button>
            <button onClick={()=>props.onChangeRouteType('car')} className={props.currentRouteType === 'car' ? classes.ActiveButton: classes.InactiveButton}><img style={{height:'30px'}} src={carIcon}></img></button>
            <button onClick={()=>props.onChangeRouteType('transit')} className={props.currentRouteType === 'transit' ? classes.ActiveButton: classes.InactiveButton}><img style={{height:'30px'}} src={tramIcon}></img></button>
            </div>
        )
 }

 const mapStateToProps = state => {
    return {
      currentRouteType: state.routeControls.currentRouteType
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onChangeRouteType: (newRouteType)=> dispatch(actionTypes.changeRouteType(newRouteType))
    };
  }
  

 export default connect(mapStateToProps,mapDispatchToProps)(RouteControls);