import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Container>
          <main>{children}</main>
        </Container>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
