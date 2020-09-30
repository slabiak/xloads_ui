import React, {useEffect, useRef} from 'react'
import classes from './Settings.module.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import {useTranslation} from 'react-i18next'

function RouteControls(props) {
    const isFirstRun = useRef(true);
    const [category, setCategory] = React.useState('1');
    const [sortBy, setSortBy] = React.useState('created.desc');
    const [priceFrom, setPriceFrom] = React.useState('');
    const [priceTo, setPriceTo] = React.useState('');
    const [flag, flipFlag] = React.useState(false);
    const {t, i18n} = useTranslation()


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        flipFlag(!flag);
    };

    const handleSortingChange = (event) => {
        setSortBy(event.target.value);
        flipFlag(!flag);
    };

    const handlePriceFromChange = (event) => {
        setPriceFrom(event.target.value);
    };

    const handlePriceToChange = (event) => {
        setPriceTo(event.target.value);
    };

    const handlePriceToBlur = () => {
        flipFlag(!flag);
    }

    const handlePriceFromBlur = () => {
        flipFlag(!flag);
    }

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        //props.onSettingsChanged({category:category,sortBy:sortBy,priceFrom:priceFrom,priceTo:priceTo});
        props.updateSettings({category: category, sortBy: sortBy, priceFrom: priceFrom, priceTo: priceTo});
        let requestParams = {
            category: category,
            priceGte: priceFrom,
            priceLte: priceTo,
            sortBy: sortBy,
            pageNumber: 0,
            limit: 5
        }
        props.makeOffersPageRequest(requestParams);

    }, [flag]);

    return (
        <div className={classes.Settings}>
            <div className={classes.SettingsBody}>

                <div class={classes.Setting}>
                    <div className={classes.SettingHeader}>{t('category.label')}:</div>
                    <div className={classes.SettingBody}>
                        <select className="custom-select" id="category" onChange={e => handleCategoryChange(e)}
                                value={category}>
                            <option value="1">{t('rooms')}</option>
                            <option value="2">{t('flats')}</option>

                        </select>
                    </div>
                </div>


                <div class={classes.Setting}>
                    <div className={classes.SettingHeader}>{t('sorting.label')}:</div>
                    <div className={classes.SettingBody}>
                        <select className="custom-select" id="sorting" onChange={e => handleSortingChange(e)}
                                value={sortBy}>
                            <option value="created.desc">{t('latest')}</option>
                            <option value="price.desc">{t('highest.price')}</option>
                            <option value="price.asc">{t('lowest.price')}</option>
                        </select>
                    </div>
                </div>
                <div class={classes.Setting}>
                    <div className={classes.SettingHeader}>{t('price.label')}</div>
                    <div className={classes.SettingBody}>

                        <div className={classes.FormWrapper}><input type="number" className='form-control'
                                                                    id="priceFrom" placeholder={t('price.from')}
                                                                    onBlur={handlePriceFromBlur}
                                                                    onChange={e => handlePriceFromChange(e)}
                                                                    value={priceFrom}></input></div>
                        <div className={classes.FormWrapper}><input type="number" className='form-control' id="priceTo"
                                                                    placeholder={t('price.to')}
                                                                    onBlur={handlePriceToBlur}
                                                                    onChange={e => handlePriceToChange(e)}
                                                                    value={priceTo}></input></div>
                    </div>
                </div>


            </div>
            {/* <div className={classes.SettingsFooter}>
  <button type="button" className="btn btn-success btn-md" onClick={(event)=>props.onButtonClicked(event,{category:category,sortBy:sortBy,priceFrom:priceFrom,priceTo:priceTo})}>Szukaj</button> 
  </div> */}
        </div>

    )
}

const mapStateToProps = state => {
    return {
        currentPage: state.offers.currentPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateSettings: (newSettings) => dispatch(actionTypes.updateSettings(newSettings)),
        makeOffersPageRequest: (requestParams) => dispatch(actionTypes.makeOffersPageRequest(requestParams))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RouteControls);
