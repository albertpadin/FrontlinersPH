import React from 'react';
import { Link } from 'gatsby';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  Col,
  Progress,
  Row,
} from 'reactstrap';
import map from 'lodash/map';

import { NEED_TYPE_CHOICES } from '@src/constants';
import style from './styles.module.css';
import placeholderImg from '../../images/placeholder-img.png';

const LocationCardStats = ({ type, stats }) => {
  const label = NEED_TYPE_CHOICES.find(({ value }) => value === type).label;
  const progress = (stats.commitments / stats.requests) * 100;

  return (
    <>
      <Row className="d-flex justify-content-between">
        <Col className="text-left">
          <span className={style.statsTitle}>{label}</span>
        </Col>
      </Row>
      <Progress value={progress === Infinity ? 100 : progress} />
      <Row>
        <Col className={`mt-1 text-right ${style.stats}`}>
          {stats.commitments} commitments to {stats.requests} requests
        </Col>
      </Row>
    </>
  );
};

const LocationCard = ({ location }) => {
  const { id, author, created_at, data, statistics } = location;

  return (
    <Card className="mt-5">
      <div className="position-relative">
        <div className={`position-absolute ${style.locationDiv}`}>
          <CardTitle className={style.locationTitle}>{data.name}</CardTitle>
          <CardSubtitle className={style.locationSubtitle}>
            {data.address.city + ', ' + data.address.province}
          </CardSubtitle>
        </div>
        <CardImg
          className={style.locationImage}
          top
          width="100%"
          src={placeholderImg}
          alt="location image"
        />
      </div>
      <CardBody className={style.statsBody}>
        <div className={`${style.statsDiv} text-center`}>
          {location.statistics ? (
            map(location.statistics, (stats, type) => (
              <LocationCardStats key={type} type={type} stats={stats} />
            ))
          ) : (
            <small>No requests or donations made yet</small>
          )}
        </div>
        <Button
          tag={Link}
          to={`/location/${id}`}
          color="primary"
          className="mt-4"
          block
        >
          View Efforts
        </Button>
      </CardBody>
    </Card>
  );
};

export default LocationCard;
