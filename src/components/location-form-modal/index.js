import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  Row,
  Col,
} from 'reactstrap';

import style from './styles.module.css';

const LocationFormModal = ({ isShow, toggle }) => {
  return (
    <Modal isOpen={isShow} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Add a Location</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">What’s the name of your location?</Label>
            <Input type="text" name="name" placeholder="Enter location" />
          </FormGroup>
          <FormGroup>
            <Label for="name">What’s your location type?</Label>
            <Input type="select" name="type">
              <option disabled>Select location type</option>
              <option>Hospital</option>
              <option>Quarantine Area</option>
            </Input>
          </FormGroup>
          <Row>
            <Col>
              <FormGroup>
                <Label for="city">What city/municipality are you from?</Label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Enter city/municipality"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="province">What province do you live in?</Label>
                <Input
                  type="text"
                  name="province"
                  placeholder="Enter province"
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Submit Entry
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
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
