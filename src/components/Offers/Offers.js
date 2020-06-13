import React from 'react';
import Offer from './Offer/Offer';
import classes from './Offers.module.css';
import {Pagination} from 'react-bootstrap';

function Offers(props) {

    


    let offers = props.data.map(offer => 
       <Offer mode={props.mode} key={offer.id} onMouseLeaveHandler={props.onMouseLeaveHandler} onMouseOverOfferHandler={props.onMouseOverOfferHandler} data={offer}></Offer>
    )
    return (
        <div className={classes.LeftPane}>

{/* <div className={classes.LeftPaneHeader}>
        Header
    </div> */}

    <div className={classes.OffersBox}>
      <div>
        <ul className={classes.OffersItems}> 
            {offers}
        </ul>
        </div>
        {/* <div>
            Pagination!
        </div> */}
    </div>
    <div className={classes.LeftPaneFooter}>


    <div className={classes.pagination}>
  <a href="#">&laquo;</a>
  <a className={classes.active} href="#">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
  <a href="#">4</a>
  <a href="#">5</a>
  <a href="#">6</a>
  <a href="#">&raquo;</a>
</div>

    </div>

    </div>
    )
}

export default Offers;