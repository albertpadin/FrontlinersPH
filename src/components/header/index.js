import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import style from './styles.module.css';

const Header = ({ siteTitle }) => (
  <header className={style.header}>
    <div className={style.wrapper}>
      <h1 className={style.heading}>
        <Link to="/" className={style.link}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
