import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

import LocationNeedsTable from '@components/location-needs-table';

const getLocationData = async id => {
  const snapshot = await firebase
    .firestore()
    .doc(`locations/${id}`)
    .get();
  return snapshot.data();
};

const getLocationNeeds = async id => {
  const snapshot = await firebase
    .firestore()
    .collection('needs')
    .where('data.location', '==', id)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const LocationTemplate = ({ location }) => {
  const [data, setData] = useState(null);
  const [needs, setNeeds] = useState(null);
  const [_, id] = location.pathname.match(/\/location\/(\w+)/);

  useEffect(() => {
    (async () => {
      if (!id) {
        return navigate('/404');
      }

      const [locationData, locationNeeds] = await Promise.all([
        getLocationData(id),
        getLocationNeeds(id),
      ]);

      if (!locationData) {
        return navigate('/404');
      }
      setData(locationData);
      setNeeds(locationNeeds);
    })();
  }, [id]);

  return (
    <>
      <h1>{data ? data.data.name : 'Loading...'}</h1>
      {needs && <LocationNeedsTable needs={needs} />}
    </>
  );
};

export default LocationTemplate;
