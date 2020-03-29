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

import style from './styles.module.css';
import placeholderImg from '../../images/placeholder-img.png';

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
        <CardImg top width="100%" src={placeholderImg} alt="location image" />
      </div>
      <CardBody>
        {/* TODO: Get sum of location statistics (commitments and requests) and its percentage for progress bar */}
        <Row className="d-flex justify-content-between">
          <Col>
            <span className={style.statsTitle}>Location Statistics</span>
          </Col>
        </Row>
        <Progress value="25" />
        <Row>
          <Col className={`mt-1 text-right ${style.stats}`}>
            100 commitments to 800 requests
          </Col>
        </Row>
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
