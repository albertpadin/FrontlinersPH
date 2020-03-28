import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

const getLocationData = async id => {
  const snapshot = await firebase
    .firestore()
    .doc(`locations/${id}`)
    .get();
  return snapshot.data();
};

const LocationTemplate = ({ location }) => {
  const [data, setData] = useState(null);
  const [_, id] = location.pathname.match(/\/location\/(\w+)/);

  useEffect(() => {
    (async () => {
      if (!id) {
        return navigate('/404');
      }

      const locationData = await getLocationData(id);
      if (!locationData) {
        return navigate('/404');
      }

      setData(locationData);
      console.log(locationData);
    })();
  }, [firebase, id]);

  return <h1>{data ? data.data.name : 'Loading...'}</h1>;
};

export default LocationTemplate;
