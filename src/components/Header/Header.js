import React from 'react'
import classes from './Header.module.css';
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next'


function RouteControls(props) {

    const {t, i18n} = useTranslation()
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


                <Link to="/contact">{t('contact')}</Link>
            </div>


        </div>
    )
}

export default RouteControls;