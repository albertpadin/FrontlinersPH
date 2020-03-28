import React, { useEffect, useState } from 'react';
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
import LocationCard from '../components/location-card';
import LocationFormModal from '../components/location-form-modal';

const IndexPage = () => {
  // TODO: Demo only, to check if firebase gets loaded properly.
  // Please remove when working on implementing this page already, thanks!
  useEffect(() => {
    console.log(firebase);
  }, []);

  const [isShowLocationModal, setIsShowLocationModal] = useState(false);
  const toggleLocationModal = () => {
    console.log('here');
    setIsShowLocationModal(!isShowLocationModal);
    console.log(isShowLocationModal);
  };

  const locations_sample = [
    {
      data: {
        name: 'Chong Hua Hospital',
        address: 'Mandaue City, Cebu',
      },
      statistics: {
        meals: {
          total_requested: 123,
          total_commited: 456,
        },
        face_masks: {
          total_requested: 123,
          total_commited: 456,
        },
      },
    },
    {
      data: {
        name: 'Vicente Sotto Hospital',
        address: 'Cebu City, Cebu',
      },
      statistics: {
        meals: {
          total_requested: 100,
          total_commited: 213,
        },
        face_masks: {
          total_requested: 153,
          total_commited: 446,
        },
      },
    },
    {
      data: {
        name: 'Mactan Doctors Hospital',
        address: 'Lapu-lapu City, Cebu',
      },
      statistics: {
        meals: {
          total_requested: 100,
          total_commited: 213,
        },
        face_masks: {
          total_requested: 153,
          total_commited: 446,
        },
      },
    },
  ];

  const locationCards = locations_sample.map(({ data, statistics }) => (
    <Col>
      <LocationCard location={data.name} statistics={statistics} />
    </Col>
  ));

  return (
    <Layout>
      <SEO title="Home" />
      <Row className={style.main}>
        <Col xs={12} md={6}>
          <Image />
        </Col>
        <Col xs={12} md={{ size: '5', offset: 1 }} className="mt-5">
          <h1 className="mb-5">
            Help as much as you can. Ask for help if needed.
          </h1>
          <Button outline color="primary" onClick={toggleLocationModal} block>
            Add location
          </Button>
          <Button outline color="primary" block>
            Request donations
          </Button>
          <Button outline color="primary" block>
            Send donations
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <InputGroup>
            <Input placeholder="Type a location" />
            <InputGroupAddon addonType="append">
              <Button color="primary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-5">{locationCards}</Row>
      <LocationFormModal
        isShow={isShowLocationModal}
        toggle={toggleLocationModal}
      />
    </Layout>
  );
};

export default IndexPage;
