import React, { useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

import Layout from '@layouts/default';
import Image from '@components/image';
import SEO from '@components/seo';
import style from './index.module.css';

const IndexPage = () => {
  // TODO: Demo only, to check if firebase gets loaded properly.
  // Please remove when working on implementing this page already, thanks!
  useEffect(() => {
    console.log(firebase);
  }, []);

  return (
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
};

export default IndexPage;
