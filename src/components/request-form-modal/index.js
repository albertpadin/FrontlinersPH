import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  FormGroup,
  Input,
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
import { NEED_TYPE_CHOICES, UNIT_CHOICES } from '@src/constants';

const RequestFormModal = ({ isShow, toggle, location, locationName }) => {
  const { user } = useFirebaseUser();
  const defaults = {
    location,
    type: '',
    quantity: 0,
    unit: '',
    date: '',
    details: '',
  };
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState(defaults);

  const createLocationRequest = async data => {
    data.quantity = parseInt(data.quantity);

    const revision = {
      data: {
        location,
        ...data,
      },
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
      .doc()
      .collection('revisions')
      .add(revision);
  };

  const handleSubmit = async (event, values) => {
    setLoading(true);
    await createLocationRequest(values)
      .then(() => {
        toggle();
        setLoading(false);
        setData(defaults);
      })
      .catch(error => {
        console.error('Error writing firestore document: ', error);
      });
  };

  return (
    <Modal isOpen={isShow} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>REQUEST FORM</ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit}>
          <FormGroup>
            <Label for="locationName">Beneficiary/Hospital Name</Label>
            <Input
              type="text"
              name="locationName"
              id="locationName"
              value={locationName}
              disabled
            />
          </FormGroup>
          <AvGroup>
            <Label for="type">What do you need?</Label>
            <AvField
              type="select"
              name="type"
              id="type"
              value={data.type}
              required
            >
              <option value="" disabled>
                Select type
              </option>
              {NEED_TYPE_CHOICES.map(choice => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </AvField>
            <AvFeedback>Please choose your need type</AvFeedback>
          </AvGroup>
          <Row>
            <Col md={8} xs={12}>
              <AvGroup>
                <Label for="quantity">How much/many do you need?</Label>
                <AvInput
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={data.quantity}
                  placeholder="Enter quantity"
                  required
                />
                <AvFeedback>Please enter quantity</AvFeedback>
              </AvGroup>
            </Col>
            <Col md={4} xs={12}>
              <AvGroup>
                <Label for="unit">Unit of measurement?</Label>
                <AvField
                  type="select"
                  name="unit"
                  id="unit"
                  value={data.unit}
                  required
                >
                  <option value="" disabled>
                    Select unit
                  </option>
                  {UNIT_CHOICES.map(choice => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </AvField>
                <AvFeedback>Please enter unit</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          <AvGroup>
            <Label for="date">When do you need these?</Label>
            <AvInput
              id="date"
              name="date"
              type="date"
              value={data.date}
              required
            />
            <AvFeedback>Please enter date</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="details">Additional notes:</Label>
            <AvInput
              id="details"
              name="details"
              type="textarea"
              value={data.details}
            />
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
