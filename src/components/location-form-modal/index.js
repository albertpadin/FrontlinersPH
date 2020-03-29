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

const LocationFormModal = ({ isShow, toggle }) => {
  const addLocation = data => {
    console.log(data);
    return firebase
      .firestore()
      .collection('locations')
      .add({
        name: data.name,
        type: data.type,
        address: {
          city: data.address.city,
          province: data.address.province,
        },
      })
      .then(() => {
        toggle();
      })
      .catch(error => {
        console.error('Error writing firestore document: ', error);
      });
  };

  const handleSubmit = (event, values) => {
    addLocation(values);
  };

  return (
    <Modal isOpen={isShow} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Add a Location</ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit}>
          <AvGroup>
            <Label for="name">What’s the name of your location?</Label>
            <AvInput
              type="text"
              name="name"
              placeholder="Enter location"
              required
            />
            <AvFeedback>Please enter your location</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="name">What’s your location type?</Label>
            <AvField type="select" name="type" required>
              <option disabled>Select location type</option>
              <option value="HOSPITAL">Hospital</option>
              <option value="PRODUCTION_HUB">Production Hub</option>
              <option value="KITCHEN">Kitchen</option>
              <option value="QUARANTINE_AREA">Quarantine Area</option>
              <option value="FRONTLINERS_ACCOMMODATION">
                Frontliners Accommodation
              </option>
            </AvField>
            <AvFeedback>Please choose your location type</AvFeedback>
          </AvGroup>
          <Row>
            <Col>
              <AvGroup>
                <Label for="city">What city/municipality are you from?</Label>
                <AvInput
                  type="text"
                  name="address.city"
                  placeholder="Enter city/municipality"
                  required
                />
                <AvFeedback>Please enter your city</AvFeedback>
              </AvGroup>
            </Col>
            <Col>
              <AvGroup>
                <Label for="province">What province do you live in?</Label>
                <AvInput
                  type="text"
                  name="address.province"
                  placeholder="Enter province"
                  required
                />
                <AvFeedback>Please enter your province</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          <Button color="primary" type="submit" block>
            Submit Entry
          </Button>
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

LocationFormModal.propTypes = {
  isShow: PropTypes.bool,
  toggle: PropTypes.func,
};

LocationFormModal.defaultProps = {
  isShow: false,
};

export default LocationFormModal;
