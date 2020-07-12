import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash/throttle';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Search.module.css';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import RouteControls from './../RouteControls/RouteControls.js';

export default function Search(props) {
const CancelToken = axios.CancelToken;
let cancel;
  const [inputValue, setInputValue] = React.useState(props.inputValue);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
        axios.get(`https://photon.komoot.de/api/?q=${param.value}&limit=10`,{
            cancelToken: new CancelToken(function executor(c) {
              // An executor function receives a cancel function as a parameter
              cancel = c;
            })
          })
        .then(resp => {
            setLoading(false);
            let features = resp.data.features;
            setOptions(features);
        }).catch(e=>{
            if(axios.isCancel(e)){
              //  console.log('request cancelled');
            }
        })
      }, 500),
    [],
  );

  React.useEffect(() => {
    if (inputValue.length > 0) {
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
    if(props.selectedPlace.autocomplete === false){
    setInputValue(props.selectedPlace.address);
    }
  }, [props.selectedPlace])

  return (
        //  <Grid container justify = "center"  >
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
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.properties.name )}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      onChange={(event,value,reason)=>{
          if(reason==='select-option'){
              props.clicked(value);
              setInputValue(value.properties.name)
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
    //  </Grid>
  );
}