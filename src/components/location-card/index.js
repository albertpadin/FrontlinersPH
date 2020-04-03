import React from 'react';
import { Link } from 'gatsby';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Col,
  Progress,
  Row,
} from 'reactstrap';
import map from 'lodash/map';
import format from 'date-fns/format';
import { NEED_TYPE_CHOICES } from '@src/constants';
import style from './styles.module.css';
import placeholderImg from '../../images/placeholder-new.png';
import ClockIcon from '@assets/svg/clock.svg';
import ChevronIcon from '@assets/svg/chevron.svg';

const LocationCardStats = ({ type, stats }) => {
  const label = NEED_TYPE_CHOICES.find(({ value }) => value === type).label;
  const progress = (stats.commitments / stats.requests) * 100;

  return (
    <React.Fragment>
      <Row className="d-flex justify-content-between">
        <Col className="text-left">
          <span className={style.statsTitle}>{label}</span>
        </Col>
      </Row>
      <Progress
        style={{height: 10}}
        value={progress === Infinity ? 100 : progress}
        color={"#60A1EC"}
      />
      <Row>
        <Col className={`mt-1 text-right ${style.stats}`}>
          {stats.commitments} donations to {stats.requests} requests
        </Col>
      </Row>
    </React.Fragment>
  );
};

const LocationCard = ({ location }) => {
  const { id, created_at, data, statistics } = location;
  const statCount = statistics ? Object.keys(statistics).length : 0;

  return (
    <Card className="mt-5" style={{borderRadius: 10}}>
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

      <div className={style.locationUpdate}>
        <span className={style.clockIcon}>
          <ClockIcon/>{' '}
          <p className={style.locationStatus}>UPDATED</p>
        </span>
        <div className={style.locationTimestamp}>
          {format(new Date().setTime(created_at.seconds * 1000), 'MMMM d, yyyy h:mm a')}
        </div>
      </div>

      <CardBody className={style.statsBody}>
        <span className={style.statsCount}>
          {`This location ${statCount === 1 ? 'need' : 'needs'}`}
          <b>{`${statCount} ${statCount === 1 ? 'item' : 'items'}`}</b>
        </span>
        <div className={`${style.statsDiv} text-center`}>
          {statistics ? (
            map(statistics, (stats, type) => (
              <LocationCardStats key={type} type={type} stats={stats} />
            ))
          ) : (
            <small>No requests or donations made yet</small>
          )}
        </div>
        
      </CardBody>
      <CardFooter className={style.statsFooter}>
        <Link
          to={`/location/${id}`}
          className={style.statsLink}
        >
          View Efforts
          <ChevronIcon/>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
