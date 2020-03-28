import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

import Layout from '@layouts/default';
import SEO from '@components/seo';
import RequestsTable from '@components/requests-table';

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

const LocationTemplate = ({ location }) => {
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);
  const [_, id] = location.pathname.match(/\/location\/(\w+)/);

  useEffect(() => {
    (async () => {
      if (!id) {
        return navigate('/404');
      }

      const [locationData, locationNeeds] = await Promise.all([
        getLocationData(id),
        getLocationRequests(id),
      ]);

      if (!locationData) {
        return navigate('/404');
      }
      setData(locationData);
      setRequests(locationNeeds);
    })();
  }, [id]);

  return (
    <Layout>
      <SEO title={data ? data.data.name : 'Location'} />

      <h1>{data ? data.data.name : 'Loading...'}</h1>
      {requests && <RequestsTable needs={requests} />}
    </Layout>
  );
};

export default LocationTemplate;
