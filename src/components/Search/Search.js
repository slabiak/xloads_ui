import React, {useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash/throttle';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Search.module.css';
import RouteControls from './../RouteControls/RouteControls.js';
import {isWithinBoundingBox} from './../../util/LatLngUtil';

const buildAddresFromPlaceProperties = (properties) => {
  let newAddress = '';
  if(properties.osm_key === 'highway'){
    if(properties.postcode){
      newAddress = properties.postcode;
    } 
    if(properties.city){
      newAddress = newAddress + ' ' + properties.city;
    }
    if(properties.name){
      newAddress = newAddress + ', ' +properties.name
    } 

  }
 else{
  if(properties.postcode){
    newAddress = properties.postcode;
  } 
  if(properties.city){
    newAddress = newAddress + ' ' + properties.city;
  }
  if(properties.street){
    newAddress = newAddress + ', ' +properties.street;
  } 
  if(properties.housenumber){
    newAddress = newAddress + ', ' + properties.housenumber;
  }

  // if(properties.name){
  //   newAddress = newAddress + ', ' + properties.name;
  // }

 }
  return newAddress
}


const buildInputTextFromSelectedPlace= (selectedPlace)=>{
  if(selectedPlace.properties ===undefined && !selectedPlace.error){
    return 'Szukam adresu...';
  } else if(selectedPlace.error){
    return 'Błąd. Sprobój ponownie później';
  } else {
    return buildAddresFromPlaceProperties(selectedPlace.properties);
}
}


export default function Search(props) {
let autoCompleteErrorMessage = 'Błąd. Spróbuj ponownie później';
let autoCompleteApiTimeout = 15000;
const CancelToken = axios.CancelToken;
let cancel;

  const isFirstRun = useRef(true);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(buildInputTextFromSelectedPlace(props.selectedPlace));
  



  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  

  const fetch = React.useMemo(
    () =>
      throttle((param) => {
        setLoading(true);
        if (cancel !== undefined) {
            cancel();
        }
        axios.get(`https://photon.komoot.de/api/?q=${param.value}&lon=17&lat=51&limit=10`,{
            cancelToken: new CancelToken(function executor(c) {
              cancel = c;
            }
            ),
            timeout:autoCompleteApiTimeout
          })
        .then(resp => {
            setLoading(false);
            let filteredFeatures = resp.data.features.filter(feature => feature.properties.osm_key === 'highway' || feature.properties.street !==undefined)
            setOptions(filteredFeatures);
        }).catch(e=>{
            if(axios.isCancel(e)){
            }else{
            setLoading(false);
            props.clicked({...props.selectedPlace, error: true})
            }
        })
      }, 500),
    [],
  );

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (inputValue.length > 0 && open && inputValue != autoCompleteErrorMessage) {
        fetch({value: inputValue});
    } else {
        setLoading(false);
        setOptions([]);
        return undefined;
    }
  }, [inputValue, fetch]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(()=>{
    if(props.selectedPlace.autocomplete === false || (props.selectedPlace.autocomplete === true && props.selectedPlace.error)){
    setInputValue(buildInputTextFromSelectedPlace(props.selectedPlace));
    }
  }, [props.selectedPlace])

  return (
    <div className={classes.TopPanel}>

      <div className={classes.ControlsBox}>
    <RouteControls onRouteTypeChange={props.onRouteTypeChange} activeRouteType={props.routeType}></RouteControls>
    </div>

      <div className={classes.SearchBox}>
    <Autocomplete
      value={inputValue}
      id="autocomplete"
      style={{}}
      open={open}
      onClose={(event,reason)=>{
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      freeSolo
      getOptionLabel={(option) => (typeof option === 'string' ? option : buildAddresFromPlaceProperties(option.properties) )}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      onChange={(event,value,reason)=>{
          if(reason==='select-option'){
            if(isWithinBoundingBox(props.currentSearchRegion.boundingBox,value.geometry.coordinates)){
              props.clicked(value);
            }else{
              setInputValue(buildAddresFromPlaceProperties(props.selectedPlace.properties))
              alert('za daleko ziomus');
              }
          }
          if(reason==='clear'){
            setInputValue('');
            setOptions([]);
        }
      }}
      renderInput={(params) => {
       
        return (
        
        <TextField
          {...params}
          label="Wpisz adres lub przesuń czerwony marker"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )
      }}
      
    />


 
    </div>
    
    </div>
  );


}

