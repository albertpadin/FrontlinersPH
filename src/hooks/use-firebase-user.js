import { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

const useFirebaseUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return user;
};

export default useFirebaseUser;
