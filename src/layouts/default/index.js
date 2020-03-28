import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'gatsby-plugin-firebase';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import '@styles/global.css';
import Header from '@components/header';
import style from './styles.module.css';
import { SiteTitleQuery } from '@src/queries';
import { FirebaseUserContext } from '@src/contexts';

const Layout = ({ children }) => {
  const data = SiteTitleQuery();
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, [firebase]);

  return (
    <FirebaseUserContext.Provider value={user}>
      <Container>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className={style.wrapper}>
          <main>{children}</main>
        </div>
      </Container>
    </FirebaseUserContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
