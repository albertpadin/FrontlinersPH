import React, { useState, useEffect } from 'react';
import { navigate, Link } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
import sortBy from 'lodash/sortBy';
import { Card, CardTitle, CardSubtitle, Col, Row, Button } from 'reactstrap';

import BackIcon from '@assets/svg/back.svg';
import Layout from '@layouts/default';
import SEO from '@components/seo';
import RequestsTable from '@components/requests-table';
import CommitmentsTable from '@components/commitments-table';
import LocationStatistics from '@components/location-statistics';
import CommitmentFormModal from '@components/commitment-form-modal';
import RequestFormModal from '@components/request-form-modal';
import Loader from '@components/loader';
import useFirebaseUser from '@hooks/use-firebase-user';

import style from './styles.module.css';

const handleSnapshotChanges = (data, snapshot) => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const doc = { id: change.doc.id, ...change.doc.data() };
      data = sortBy([doc, ...data], d => -d.created_at.toDate());
    } else if (change.type === 'modified') {
      const doc = { id: change.doc.id, ...change.doc.data() };
      data = data.map(d => (d.id === doc.id ? doc : d));
    } else if (change.type === 'removed') {
      data = data.filter(d => d.id !== change.doc.id);
    }
  });

  return data;
};

const watchLocationData = (id, callback) => {
  firebase
    .firestore()
    .doc(`locations/${id}`)
    .onSnapshot(snapshot => callback(snapshot.data()));
};

const watchLocationRequests = (id, callback) => {
  let data = [];

  firebase
    .firestore()
    .collection('requests')
    .where('data.location', '==', id)
    .onSnapshot(snapshot => {
      data = handleSnapshotChanges(data, snapshot);
      callback(data);
    });
};

const watchLocationCommitments = (id, callback) => {
  let data = [];

  firebase
    .firestore()
    .collection('commitments')
    .where('data.location', '==', id)
    .onSnapshot(snapshot => {
      data = handleSnapshotChanges(data, snapshot);
      callback(data);
    });
};

const LocationTemplate = ({ location }) => {
  const { user } = useFirebaseUser();

  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);
  const [commitments, setCommitments] = useState(null);
  const [isShowRequestModal, setIsShowRequestModal] = useState(false);
  const [isShowCommitmentModal, setIsShowCommitmentModal] = useState(false);

  const match = location.pathname.match(/\/location\/(\w+)/);
  const id = match ? match[1] : null;

  const toggleRequestModal = async () => {
    await checkUserAuth();
    setIsShowRequestModal(!isShowRequestModal);
  };

  const toggleCommitmentModal = async () => {
    await checkUserAuth();
    setIsShowCommitmentModal(!isShowCommitmentModal);
  };

  const checkUserAuth = async () => {
    if (!user) {
      const provider = new firebase.auth.FacebookAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    }
  };

  useEffect(() => {
    if (!id) {
      return navigate('/404');
    }

    watchLocationData(id, locationData => {
      if (!locationData) {
        return navigate('/404');
      }
      setData(locationData);
    });
    watchLocationRequests(id, setRequests);
    watchLocationCommitments(id, setCommitments);
  }, [id]);

  let locationDetails = <Loader />;
  if (data) {
    locationDetails = (
      <Row className="mt-5">
        <Col md={4}>
          <Link to="" className={style.backLink}>
            <span>
              <BackIcon></BackIcon>
            </span>{' '}
            Go Back to Home Page
          </Link>
          <Card className="p-3 mt-3">
            <CardTitle>
              <h3 className={style.location}>
                {data ? data.data.name : <Loader />}
              </h3>
            </CardTitle>
            <CardSubtitle className="mb-3">
              <span className={style.locationAddress}>
                {data
                  ? data.data.address.city + ', ' + data.data.address.province
                  : ''}
              </span>
            </CardSubtitle>
            <hr />
            <span className={`${style.statsTitle}`}>Statistics</span>
            {data && data.statistics ? (
              <LocationStatistics data={data.statistics} />
            ) : (
              <span class="text-gray-500">No statistics yet.</span>
            )}
          </Card>
        </Col>
        <Col md={8} className="mt-5">
          <Row>
            <Col>
              <h3>Requests</h3>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                color="primary"
                size="sm"
                className={style.addButton}
                onClick={toggleRequestModal}
              >
                Add a request
              </Button>
            </Col>
          </Row>
          {requests && <RequestsTable data={requests} />}

          <Row className="mt-5">
            <Col>
              <h3>Donations</h3>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                color="primary"
                size="sm"
                className={style.addButton}
                onClick={toggleCommitmentModal}
              >
                Add a donation
              </Button>
            </Col>
          </Row>
          {commitments && <CommitmentsTable data={commitments} />}
        </Col>
      </Row>
    );
  }

  return (
    <Layout>
      <SEO title={data ? data.data.name : 'Location'} />
      {locationDetails}
      <RequestFormModal
        location={id}
        locationName={data ? data.data.name : 'Location'}
        isShow={isShowRequestModal}
        toggle={toggleRequestModal}
      />
      <CommitmentFormModal
        location={id}
        isShow={isShowCommitmentModal}
        toggle={toggleCommitmentModal}
      />
    </Layout>
  );
};

export default LocationTemplate;
