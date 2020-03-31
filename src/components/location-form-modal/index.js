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
    setLoading(true);

    const newLocation = {
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
      .collection('locations')
      .doc()
      .collection('revisions')
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
      <ModalHeader toggle={toggle}>ADD LOCATION FORM</ModalHeader>
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
              <option value="" disabled>
                Select location type
              </option>
              <option value="HOSPITAL">Hospital</option>
              <option value="BARANGAY_HEALTH_WORKER">
                Barangay Health Worker
              </option>
              <option value="ERUF">ERUF</option>
              <option value="ARI_TRIAGE_CENTER">ARI Triage Center</option>
              <option value="BARANGAY_TRIAGE_CENTER">
                Barangay Triage Center
              </option>
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
                <Label for="city">City/Municipality</Label>
                <AvInput
                  type="text"
                  name="address.city"
                  placeholder="Enter city/municipality"
                  required
                />
                <AvFeedback>Please enter city/municipality</AvFeedback>
              </AvGroup>
            </Col>
            <Col>
              <AvGroup>
                <Label for="province">Province</Label>
                <AvInput
                  type="text"
                  name="address.province"
                  placeholder="Enter province"
                  required
                />
                <AvFeedback>Please enter province</AvFeedback>
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
