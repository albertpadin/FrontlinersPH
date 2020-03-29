import React, { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';
import {
  Button,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Row,
} from 'reactstrap';

import Layout from '@layouts/default';
import Image from '@components/image';
import SEO from '@components/seo';
import style from './index.module.css';
import LocationCard from '../components/location-card';
import LocationFormModal from '../components/location-form-modal';

const getLocations = async () => {
  const snapshot = await firebase
    .firestore()
    .collection('locations')
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const IndexPage = () => {
  const [locations, setLocations] = useState(null);
  const [isShowLocationModal, setIsShowLocationModal] = useState(false);

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  const toggleLocationModal = () => {
    console.log('here');
    setIsShowLocationModal(!isShowLocationModal);
    console.log(isShowLocationModal);
  };

  let locationCards = null;
  if (locations) {
    locationCards = locations.map(location => (
      <Col key={location.id}>
        <LocationCard location={location} />
      </Col>
    ));
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Row className={style.main}>
        <Col xs={12} md={6}>
          <Image />
        </Col>
        <Col xs={12} md={{ size: '5', offset: 1 }} className="mt-5">
          <h1 className="mb-5">
            Help as much as you can. Ask for help if needed.
          </h1>
          <Button outline color="primary" onClick={toggleLocationModal} block>
            Add location
          </Button>
          <Button outline color="primary" block>
            Request donations
          </Button>
          <Button outline color="primary" block>
            Send donations
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <InputGroup>
            <Input placeholder="Type a location" />
            <InputGroupAddon addonType="append">
              <Button color="primary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-5">{locationCards}</Row>
      <LocationFormModal
        isShow={isShowLocationModal}
        toggle={toggleLocationModal}
      />
    </Layout>
  );
};

export default IndexPage;
