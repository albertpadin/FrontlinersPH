import React from 'react';
import map from 'lodash/map';
import { Row, Col, Progress } from 'reactstrap';
import style from './styles.module.css';

const LocationStatisticsRow = ({ type, stats }) => {
  const value = (stats.commitments / stats.requests) * 100;
  return (
    <>
      <Row className="mt-3">
        <Col>
          <h6 className={style.statsTitle}>
            {type}&nbsp;
            <span className={style.stats}>
              ({stats.commitments} commitments to {stats.requests} requests)
            </span>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <Progress value={value === Infinity ? 100 : value} />
        </Col>
      </Row>
    </>
  );
};

const LocationStatistics = ({ data }) => (
  <>
    {map(data, (stats, type) => (
      <LocationStatisticsRow key={type} type={type} stats={stats} />
    ))}
  </>
);

export default LocationStatistics;
