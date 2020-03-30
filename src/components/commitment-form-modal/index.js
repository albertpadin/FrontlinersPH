import React, { useState } from 'react';
import firebase from 'gatsby-plugin-firebase';

import { NEED_TYPE_CHOICES, UNIT_CHOICES } from '@src/constants';
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import RequestFormModal from '../request-form-modal';
import useFirebaseUser from '@hooks/use-firebase-user';

const CommitmentFormModal = ({ isShow, toggle, location }) => {
  const user = useFirebaseUser();
  const defaults = {
    location,
    type: '',
    quantity: 0,
    unit: '',
    date: '',
    provider: '',
    details: '',
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaults);

  const createLocationCommitment = async data => {
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
      .collection('commitments')
      .doc()
      .collection('revisions')
      .add(revision);
  };

  const handleSubmit = async (event, values) => {
    setLoading(true);
    await createLocationCommitment(values)
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
      <ModalHeader toggle={toggle}>DONATION FORM</ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit}>
          {/*<AvGroup>*/}
          {/*  <Label for="name">What’s the name of your location?</Label>*/}
          {/*  <AvInput*/}
          {/*    type="text"*/}
          {/*    name="name"*/}
          {/*    placeholder="Enter location"*/}
          {/*    required*/}
          {/*  />*/}
          {/*</AvGroup>*/}
          <AvGroup>
            <Label for="type">What can you donate?</Label>
            <AvField type="select" name="type" required value={data.type}>
              <option value="" disabled>
                Select type
              </option>
              {NEED_TYPE_CHOICES.map(choice => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </AvField>
            <AvFeedback>Please choose your donation type</AvFeedback>
          </AvGroup>

          <Row>
            <Col md="8">
              <AvGroup>
                <Label for="quantity">
                  How much/many will you be able to donate?
                </Label>
                <AvInput
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={data.quantity}
                  placeholder="Enter quantity"
                  required
                />
                <AvFeedback>Please enter the quantity</AvFeedback>
              </AvGroup>
            </Col>
            <Col md="4">
              <AvGroup>
                <Label for="unit">Unit of measurement?</Label>
                <AvField type="select" name="unit" required value={data.unit}>
                  <option value="" disabled>
                    Select unit
                  </option>
                  {UNIT_CHOICES.map(choice => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </AvField>
                <AvFeedback>Please enter the quantity</AvFeedback>
              </AvGroup>
            </Col>
          </Row>

          <AvGroup>
            <Label for="date">When will you be able to send these?</Label>
            <AvInput
              type="date"
              name="date"
              placeholder="MM / DD / YYYY"
              value={data.date}
              required
            />
            <AvFeedback>Please enter date</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label for="provider">Who will provide the supplies?</Label>
            <AvInput
              type="text"
              name="provider"
              placeholder="Enter provider"
              value={data.provider}
              required
            />
            <AvFeedback>Please enter the provider</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label for="details">Additional notes:</Label>
            <AvInput type="textarea" name="details" value={data.details} />
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

export default CommitmentFormModal;
