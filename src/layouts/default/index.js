import React from 'react';
import PropTypes from 'prop-types';

import '@styles/global.css';
import Header from '@components/header';
import style from './styles.module.css';
import { SiteTitleQuery } from '@src/queries';

const Layout = ({ children }) => {
  const data = SiteTitleQuery();

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={style.wrapper}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with{' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
