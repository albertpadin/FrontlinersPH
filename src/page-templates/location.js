import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
import sortBy from 'lodash/sortBy';

import useFirebaseUser from '@hooks/use-firebase-user';
import Layout from '@layouts/default';
import SEO from '@components/seo';
import RequestsTable from '@components/requests-table';
import CommitmentsTable from '@components/commitments-table';
import LocationStatistics from '@components/location-statistics';
import CommitmentForm from '@components/commitment-form';

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
  const user = useFirebaseUser();
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);
  const [commitments, setCommitments] = useState(null);
  const [_, id] = location.pathname.match(/\/location\/(\w+)/);

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

  return (
    <Layout>
      <SEO title={data ? data.data.name : 'Location'} />

      <h1>{data ? data.data.name : 'Loading...'}</h1>
      {data && <LocationStatistics data={data.statistics} />}

      <h2>Requests</h2>
      {requests && <RequestsTable data={requests} />}

      <h2>Commitments</h2>
      {commitments && <CommitmentsTable data={commitments} />}

      {user && (
        <>
          <h2>New Commitment</h2>
          <CommitmentForm location={id} />
        </>
      )}
    </Layout>
  );
};

export default LocationTemplate;
