import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import firebase from 'gatsby-plugin-firebase';
import useFirebaseUser from '@hooks/use-firebase-user';

const RequestFormModal = ({ isShow, toggle }) => {
  const user = useFirebaseUser();
  const [loading, setLoading] = React.useState(false);

  const addRequest = async data => {
    console.log(data);
    setLoading(true);

    const newRequest = {
      data,
      author: {
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
      },
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await firebase
      .firestore()
      .collection('requests')
      .add(newRequest)
      .then(() => {
        toggle();
        setLoading(false);
      })
      .catch(error => {
        console.error('Error writing firestore document: ', error);
      });
  };

  const handleSubmit = async (event, values) => {
    await addRequest(values);
  };

  return (
    <Modal isOpen={isShow} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>REQUEST FORM</ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit}>
          <AvGroup>
            <Label for="name">What’s your location?</Label>
            <AvInput
              type="text"
              name="name"
              placeholder="Enter location"
              required
            />
            <AvFeedback>Please enter your location</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="name">What do you need?</Label>
            <AvField type="select" name="type" required>
              <option value disabled>
                Select type
              </option>
              <option value="MEALS">Meals</option>
              <option value="FACE_MASKS">Face Masks</option>
              <option value="FACE_SHIELDS">Face Shields</option>
              <option value="SUITS">Suits</option>
              <option value="RAW_MATERIALS">Raw Materials</option>
              <option value="OTHER">Other</option>
              <option value="CASH">Cash</option>
            </AvField>
            <AvFeedback>Please choose your need type</AvFeedback>
          </AvGroup>
          <Row>
            <Col md={8} xs={12}>
              <AvGroup>
                <Label for="quantity">How much/many do you need?</Label>
                <AvInput
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  required
                />
                <AvFeedback>Please enter quantity</AvFeedback>
              </AvGroup>
            </Col>
            <Col md={4} xs={12}>
              <AvGroup>
                <Label for="name">Unit of measurement?</Label>
                <AvField type="select" name="unit" required>
                  <option value>Select unit</option>
                  <option value="PIECES">Pieces</option>
                  <option value="PESOS">Pesos</option>
                  <option value="KG">Kilos</option>
                </AvField>
                <AvFeedback>Please enter unit</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          <AvGroup>
            <Label for="name">When will you be able to send these?</Label>
            <AvInput
              type="date"
              name="date"
              placeholder="Enter date"
              required
            />
            <AvFeedback>Please enter date</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="details">Additional notes:</Label>
            <AvInput type="textarea" name="details" />
          </AvGroup>
          <Button color="primary" type="submit" block disabled={loading}>
            {loading ? 'Submitting' : 'Submit'} Entry
          </Button>
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

RequestFormModal.propTypes = {
  isShow: PropTypes.bool,
  toggle: PropTypes.func,
};

RequestFormModal.defaultProps = {
  isShow: false,
};

export default RequestFormModal;
