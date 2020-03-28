import React, { useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';
import {
  Button,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Row,
} from 'reactstrap';

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
      <Row>
        <Col>
          <Image />
        </Col>
        <Col>
          <h1>2,000,123</h1>
          <h4>PPEs Donated</h4>
          <p>
            Help as much as you can. Ask for help if needed. Something like
            that. Help as much as you can. Ask for help if needed. Something
            like that.
          </p>
          <Button outline color="primary" block>
            Add Location
          </Button>
          <Button outline color="primary" block>
            Request donations
          </Button>
          <Button outline color="primary" block>
            Send donations
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <Input placeholder="Type a location" />
            <InputGroupAddon addonType="append">
              <Button color="primary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </Layout>
  );
};

export default IndexPage;
