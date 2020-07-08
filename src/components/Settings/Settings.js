

import React, { useState } from 'react'
import classes from './Settings.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import {Dropdown, DropdownButton} from 'react-bootstrap';

function RouteControls (props) {

   const [category, setCategory] = React.useState('1');
   const [sortBy, setSortBy] = React.useState('created.desc');
   const[priceFrom, setPriceFrom] = React.useState('');
   const[priceTo, setPriceTo] = React.useState('');


   const handleCategoryChange = (event) => {
     setCategory(event.target.value);
   };

   const handleSortingChange = (event) => {
      setSortBy(event.target.value);
    };

    const handlePriceFromChange = (event) => {
      setPriceFrom(event.target.value);
    };

    const handlePriceToChange = (event) => {
      setPriceTo(event.target.value);
    };

       return (
       <div className={classes.Settings}>
        <div className={classes.SettingsBody}>

<div class={classes.Setting}>
     <div className={classes.SettingHeader}>Kategoria:</div>
     <div className={classes.SettingBody}>
     <select className="custom-select" id="category" onChange={e=>handleCategoryChange(e)} value={category}>
    <option value="1">Pokoje</option>
    <option value="2">Mieszkania</option>

  </select>
     </div>
  </div>

  
  <div class={classes.Setting}>
     <div className={classes.SettingHeader}>Sortuj:</div>
     <div className={classes.SettingBody}>
     <select className="custom-select" id="sorting" onChange={e=>handleSortingChange(e)} value={sortBy}>
    <option value="created.desc">Najnowsze</option>
    <option value="price.desc">Najdroższe</option>
    <option value="price.asc">Najtańsze</option>
  </select>
     </div>
  </div>
<div class={classes.Setting}>
     <div className={classes.SettingHeader}>Cena</div>
     <div className={classes.SettingBody}>
     <input type="number" className="form-control" id="priceFrom" placeholder="Od" onChange={e=>handlePriceFromChange(e)} value={priceFrom}></input>
     <input type="number" className="form-control" id="priceTo" placeholder="Do" onChange={e=>handlePriceToChange(e)} value={priceTo}></input>
     </div>
  </div>
  

           
      
  
 
  </div>
<div className={classes.SettingsFooter}>
  <button type="button" className="btn btn-success btn-md" onClick={(event)=>props.onButtonClicked(event,{category:category,sortBy:sortBy,priceFrom:priceFrom,priceTo:priceTo})}>Szukaj</button> 
  </div>
   </div>

       )
}

export default RouteControls;
