import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'gatsby-plugin-firebase';

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
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={style.wrapper}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with{' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </FirebaseUserContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
