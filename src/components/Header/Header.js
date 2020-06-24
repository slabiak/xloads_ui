
import React from 'react'
import classes from './Header.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import {Dropdown, DropdownButton} from 'react-bootstrap';
function RouteControls (props) {

    const [city, setCity] = React.useState('');

    const handleChange = (event) => {
      setCity(event.target.value);
    };


       return (
        <div className={classes.Header}>
            <div>

            <a href="">Dodaj ogłoszenie</a>
     <a href="">Kontakt</a>
            </div>


     </div>
       )
}

export default RouteControls;