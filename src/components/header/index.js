import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

import style from './styles.module.css';
import { FirebaseUserContext } from '@src/contexts';

const Header = ({ siteTitle }) => {
  const user = useContext(FirebaseUserContext);
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

  const AuthButton = () =>
    user ? (
      <button onClick={logout} disabled={loading}>
        Logout
      </button>
    ) : (
      <button onClick={login} disabled={loading}>
        Login with Facebook
      </button>
    );

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <h1 className={style.heading}>
          <Link to="/" className={style.link}>
            {siteTitle}
          </Link>
        </h1>

        <AuthButton />
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
