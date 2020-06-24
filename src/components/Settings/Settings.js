

import React from 'react'
import classes from './Settings.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import {Dropdown, DropdownButton} from 'react-bootstrap';
function RouteControls (props) {

       return (
       <div className={classes.Settings}>
        <div className={classes.SettingsBody}>

<div class={classes.Setting}>
     <div className={classes.SettingHeader}>Kategoria:</div>
     <div className={classes.SettingBody}>
     <select className="custom-select" id="inputGroupSelect01">
    <option value="1">Mieszkania</option>
    <option value="2">Pokoje</option>

  </select>
     </div>
  </div>

  
  <div class={classes.Setting}>
     <div className={classes.SettingHeader}>Sortuj:</div>
     <div className={classes.SettingBody}>
     <select className="custom-select" id="inputGroupSelect02">
    <option value="1">Najnowsze</option>
    <option value="2">Najdroższe</option>
    <option value="3">Najtańsze</option>
  </select>
     </div>
  </div>
<div class={classes.Setting}>
     <div className={classes.SettingHeader}>Cena</div>
     <div className={classes.SettingBody}>
     <input type="text" className="form-control" id="priceFrom" placeholder="Od"></input>
     <input type="text" className="form-control" id="priceFrom" placeholder="Do"></input>
     </div>
  </div>
  

           
      
  
 
  </div>
<div className={classes.SettingsFooter}>
  <button type="button" className="btn btn-success btn-md">Szukaj</button> 
  </div>
   </div>

       )
}

export default RouteControls;
