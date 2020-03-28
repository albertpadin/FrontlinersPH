import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

import Layout from '@layouts/default';
import SEO from '@components/seo';
import RequestsTable from '@components/requests-table';
import CommitmentsTable from '@components/commitments-table';
import LocationStatistics from '@components/location-statistics';
import CommitmentForm from '@components/commitment-form';

const getLocationData = async id => {
  const snapshot = await firebase
    .firestore()
    .doc(`locations/${id}`)
    .get();
  return snapshot.data();
};

const getLocationRequests = async id => {
  const snapshot = await firebase
    .firestore()
    .collection('requests')
    .where('data.location', '==', id)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getLocationCommitments = async id => {
  const snapshot = await firebase
    .firestore()
    .collection('commitments')
    .where('data.location', '==', id)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const LocationTemplate = ({ location }) => {
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);
  const [commitments, setCommitments] = useState(null);
  const [_, id] = location.pathname.match(/\/location\/(\w+)/);

  useEffect(() => {
    if (!id) {
      return navigate('/404');
    }

    getLocationData(id).then(locationData => {
      if (!locationData) {
        return navigate('/404');
      }
      setData(locationData);
    });

    getLocationRequests(id).then(setRequests);
    getLocationCommitments(id).then(setCommitments);
  }, [id]);

  return (
    <Layout>
      <SEO title={data ? data.data.name : 'Location'} />

      <h1>{data ? data.data.name : 'Loading...'}</h1>
      {data && <LocationStatistics data={data.statistics} />}

      <h2>Requests</h2>
      {requests && <RequestsTable data={requests} />}

      <h2>Commitments</h2>
      {commitments && <CommitmentsTable data={commitments} />}

      <h2>New Commitment</h2>
      <CommitmentForm location={id} />
    </Layout>
  );
};

export default LocationTemplate;
