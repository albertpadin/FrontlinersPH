import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

const LocationTemplate = ({ location }) => {
  const [data, setData] = useState(null);
  const [_, id] = location.pathname.match(/\/location\/(\w+)/);

  useEffect(() => {
    (async () => {
      if (!id) {
        return navigate('/404');
      }

      const locationSnapshot = await firebase
        .firestore()
        .doc(`locations/${id}`)
        .get();
      const locationData = locationSnapshot.data();
      if (!locationData) {
        return navigate('/404');
      }

      setData(locationData);
      console.log(locationData);
    })();
  }, [firebase, id]);

  return <div>loading location data</div>;
};

export default LocationTemplate;
