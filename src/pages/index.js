import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { Button, Col, Jumbotron, Row } from 'reactstrap';
import sortBy from 'lodash/sortBy';

import Layout from '@layouts/default';
import Image from '@components/image';
import SEO from '@components/seo';
import style from './index.module.css';
import LocationCard from '../components/location-card';
import LocationFormModal from '../components/location-form-modal';
import Loader from '../components/loader';

const watchLocations = callback => {
  let data = [];

  firebase
    .firestore()
    .collection('locations')
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const doc = { id: change.doc.id, ...change.doc.data() };
          data = sortBy([doc, ...data], d => d.created_at.toDate());
        } else if (change.type === 'modified') {
          const doc = { id: change.doc.id, ...change.doc.data() };
          data = data.map(d => (d.id === doc.id ? doc : d));
        } else if (change.type === 'removed') {
          data = data.filter(d => d.id !== change.doc.id);
        }
      });
      callback(data);
    });
};

const IndexPage = () => {
  const [locations, setLocations] = useState(null);
  const [isShowLocationModal, setIsShowLocationModal] = useState(false);

  useEffect(() => {
    watchLocations(setLocations);
  }, []);

  const toggleLocationModal = () => {
    setIsShowLocationModal(!isShowLocationModal);
  };

  let locationCards = <Loader />;
  if (locations) {
    locationCards = locations.map(location => (
      <Col md={4} xs={12} key={location.id}>
        <LocationCard location={location} />
      </Col>
    ));
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Jumbotron className={`${style.jumbotron} mt-5`}>
        <Row>
          <Col xs={12} md={{ offset: '1', size: '4' }}>
            <Image />
          </Col>
          <Col xs={12} md={{ offset: '1', size: '6' }}>
            <h1>
              Let's coordinate our relief efforts for the COVID-19 frontliners
            </h1>
            <p>
              We need your help! Help the frontliners combatting COVID-19. Share
              information on your latest or planned relief drop here and let's
              get aid where it is needed the most.
            </p>
          </Col>
        </Row>
      </Jumbotron>
      <Row className="mt-5">{locationCards}</Row>
      <Row className="mt-5 d-flex justify-content-center">
        <Col md={4} xs={12} className="text-center">
          <h4>Can't find your location?</h4>
          <Button color="info" block onClick={toggleLocationModal}>
            Add a location
          </Button>
        </Col>
      </Row>

      <LocationFormModal
        isShow={isShowLocationModal}
        toggle={toggleLocationModal}
      />
    </Layout>
  );
};

export default IndexPage;
