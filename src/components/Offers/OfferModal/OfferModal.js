import React from 'react';
import {Button, Modal} from 'react-bootstrap';

function OfferModal(props) {
    return (
        <Modal show={props.show} onHide={props.onModalHideHandler}>
            <Modal.Header closeButton>
                <Modal.Title>{props.offer.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Cena: <strong>{props.offer.price}</strong></p>
                <p>{props.offer.description}</p>
                {/* <p> {Math.round(props.offer.paths[0].totalTime/60 * 100) / 100} minut, {Math.round((props.offer.paths[0].totalDistance/1000) * 100) / 100 } km</p> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onModalHideHandler}>
                    Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OfferModal;
