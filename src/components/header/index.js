import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

import AuthButton from '@components/auth-button';
import style from './styles.module.css';

const Header = ({ siteTitle }) => {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    setLoading(false);
  };

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <h1 className={style.heading}>
          <Link to="/" className={style.link}>
            {siteTitle}
          </Link>
        </h1>

        <AuthButton loading={loading} onLogin={login} onLogout={logout} />
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
