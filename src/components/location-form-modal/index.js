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

const LocationFormModal = ({ isShow, toggle }) => {
  const user = useFirebaseUser();
  const [loading, setLoading] = React.useState(false);

  const addLocation = async data => {
    console.log(data);
    setLoading(true);

    const newLocation = {
      data: {
        name: data.name,
        type: data.type,
        address: {
          city: data.address.city,
          province: data.address.province,
        },
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
      .collection('locations')
      .add(newLocation)
      .then(() => {
        toggle();
        setLoading(false);
      })
      .catch(error => {
        console.error('Error writing firestore document: ', error);
      });
  };

  const handleSubmit = async (event, values) => {
    await addLocation(values);
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
              <option value="">Select location type</option>
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
          <Button color="primary" type="submit" block disabled={loading}>
            {loading ? 'Submitting' : 'Submit'} Entry
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
