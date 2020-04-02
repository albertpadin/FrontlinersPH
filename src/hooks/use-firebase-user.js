import { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

const useFirebaseUser = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(async user => {
      setUser(user);
      setIsAdmin(false);

      if (user) {
        const snapshot = await firebase
          .firestore()
          .doc(`admins/${user.uid}`)
          .get();
        setIsAdmin(snapshot.exists);
      }
    });
  }, []);

  return { user, isAdmin };
};

export default useFirebaseUser;
