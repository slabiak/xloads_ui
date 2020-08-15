import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Offer.module.css';
import moment from 'moment';
import 'moment/locale/pl'


function Offer(props) {

    moment.locale('pl');
    let mode = null;
    if (props.mode === 'transit') {
        mode = 'komunikacją';
    } else if (props.mode === 'car') {
        mode = 'samochodem';
    } else if (props.mode === 'foot') {
        mode = 'pieszo';
    } else if (props.mode === 'bike') {
        mode = 'rowerem';
    }
    let timeIcon = <svg className="bi bi-alarm-fill" width="0.8em" height="0.8em" viewBox="0 0 16 16"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M5.5.5A.5.5 0 0 1 6 0h4a.5.5 0 0 1 0 1H9v1.07a7.002 7.002 0 0 1 3.537 12.26l.817.816a.5.5 0 0 1-.708.708l-.924-.925A6.967 6.967 0 0 1 8 16a6.967 6.967 0 0 1-3.722-1.07l-.924.924a.5.5 0 0 1-.708-.708l.817-.816A7.002 7.002 0 0 1 7 2.07V1H5.999a.5.5 0 0 1-.5-.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1zm-5 4a.5.5 0 0 0-1 0v3.882l-1.447 2.894a.5.5 0 1 0 .894.448l1.5-3A.5.5 0 0 0 8.5 9V5z"/>
    </svg>;
    let spinner = null;
    let routeInfo = null;
    let created = moment(props.data.created).fromNow();
    if (props.data.calculationRequired && props.data && props.routingRequestState.loading) {
        spinner = <React.Fragment> <CircularProgress size={20}/> Kalkulacja trasy</React.Fragment>;
    } else if (!props.data.calculationRequired && props.data) {


        //  created.format('pl');

        let routes = props.data.paths[0].sections.filter(f => f.transitLeg).map(o => o.route);

        let transitInfo = null;

        if (props.data.paths[0].mode === 'transit') {
            transitInfo = (
                <React.Fragment>
                    <p>
                        linie: {routes.toString()} <br/>
                        przesiadki: {props.data.paths[0].transfers}
                    </p>
                </React.Fragment>
            )
        } else {
            transitInfo = 'dystans: ' + Math.round((props.data.paths[0].totalDistance / 1000) * 100) / 100 + ' km';
        }

        routeInfo =
            <React.Fragment>
                {timeIcon} {Math.round((props.data.paths[0].totalTime / 60 * 100) / 100)} min {mode}<br/>
                {/* dystans:  {Math.round((props.data.paths[0].totalDistance/1000) * 100) / 100 } km */}
                {transitInfo}

            </React.Fragment>
    } else {
        spinner = null;
        routeInfo = <React.Fragment>Błąd kalkulacji trasy {props.routingRequestState.responseCode}<br/>
            <a href="" onClick={(e) => {
                props.onRecalculateRoutesHandler(e)
            }}>Oblicz ponownie</a>
        </React.Fragment>
    }
    return (
        <li onMouseOver={() => {
            props.onMouseOverOfferHandler(props.data.id);

        }
        }
            onMouseLeave={props.onMouseLeaveHandler} key={props.data.id}>
            {/* <Card style={{ width: '100%', marginBottom:'15px' }}>
<Card.Header>{props.data.name}</Card.Header>
  <Row className='no-gutters'>
      <Col>  <Card.Img variant="left" className='img-fluid' src={props.data.img} width='216px' height='152px' /></Col>
      <Col> 
       <Card.Body>
    <Card.Title></Card.Title>
    <Card.Text>
    <p>{props.data.address}</p>
    {spinner} {routeInfo}
    </Card.Text>
    <Button variant="primary">Więcej</Button>
  </Card.Body>
  </Col>
  </Row>
</Card> */}
            <div className={classes.Offer}>
                <div className={classes.ImgContainer} style={{backgroundImage: "url(" + props.data.images[0] + ")"}}>
                    {/* <img className={classes.OfferImg} src={props.data.img}/> */}
                </div>
                <div className={classes.OfferBody}>
                    <div className={classes.OfferHeader}>
                        <b>{props.data.title}</b>
                    </div>
                    <div className={classes.OfferDescription}>
                        <p className={classes.OfferPrice}>{props.data.price} zł</p>
                    </div>
                    <div className={classes.RouteInfo}>
                        {spinner} {routeInfo}
                    </div>

                </div>
                <div className={classes.OfferFooter}>
                    dodano {created}
                </div>

                {/* <p>

    {props.data.address}</p>
<p>{spinner} {routeInfo}</p> */}

            </div>

        </li>
    )
}

export default Offer;