import { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

const useFirebaseUser = () => {
  const [user, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, [firebase]);

  return user;
};

export default useFirebaseUser;
