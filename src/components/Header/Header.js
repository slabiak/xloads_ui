
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
                     <p><strong>NearProps.com</strong></p>

               </div>

            <div>

           
     <a href="mailto:contact@nearprops.com">Kontakt</a>
            </div>


     </div>
       )
}

export default RouteControls;