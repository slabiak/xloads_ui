import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Offer.module.css';
import {Card, CardTitle, CardBody, Button, Row, Col} from 'react-bootstrap';

function Offer(props) {
    let spinner = null;
    let routeInfo = null;
    if(props.data.calculationRequired){
        spinner=<CircularProgress />
    } else {
        let routes = props.data.paths[0].sections.filter(f=>f.transitLeg).map(o=>o.route);

        let transitInfo = null;

        if(props.data.paths[0].mode==='transit'){
            transitInfo = (
                <React.Fragment>
                    <p>
        linie: {routes.toString()}  <br/>
        przesiadki: {props.data.paths[0].transfers}
        </p>
                </React.Fragment>
            )
        }

        routeInfo = 
        <p>
        czas:  {Math.round(props.data.paths[0].totalTime/ 60 * 100) / 100} min  <br/>
        dystans:  {Math.round((props.data.paths[0].totalDistance/1000) * 100) / 100 } km
        {transitInfo}
        </p>
    }
    return (
        <li onMouseOver={()=>props.onMouseOverOfferHandler(props.data.id)}
        onMouseLeave={props.onMouseLeaveHandler} key={props.data.id} > 
<Card style={{ width: '100%', marginBottom:'15px' }}>
  <Row>
      <Col>  <Card.Img variant="left" src="https://bi.im-g.pl/im/de/f6/17/z25126878IH,Dlaczego-mieszkanie-sie-nie-sprzedaje--Jak-sprzeda.jpg" width='200px' height='200px' /></Col>
      <Col> 
       <Card.Body>
    <Card.Title>{props.data.name}</Card.Title>
    <Card.Text>
    <p>{props.data.address}</p>
    {spinner} {routeInfo}
    </Card.Text>
    <Button variant="primary">Więcej</Button>
  </Card.Body>
  </Col>
  </Row>
</Card>
    </li>
    )
}

export default Offer;