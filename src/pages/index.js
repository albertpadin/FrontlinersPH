import React from 'react';

import Layout from '@layouts/default';
import Image from '@components/image';
import SEO from '@components/seo';
import style from './index.module.css';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>

    <div className={style.wrapper}>
      <Image />
    </div>
  </Layout>
);

export default IndexPage;
