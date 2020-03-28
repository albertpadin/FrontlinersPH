import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import style from './styles.module.css';

import placeholderImg from '../../images/placeholder-img.png';

const LocationCard = ({ location, statistics }) => {
  return (
    <Card className="mt-5">
      <div className="position-relative">
        <CardTitle className={style.locationText}>{location}</CardTitle>
        <CardImg top width="100%" src={placeholderImg} alt="location image" />
      </div>
      <CardBody>
        <CardSubtitle className={style.locationStatus}>
          Location Status
        </CardSubtitle>
        <ListGroup className={style.statisticsDiv} variant="flush">
          <ListGroupItem className={style.statisticsDivItem}>
            123 requests
          </ListGroupItem>
          <ListGroupItem className={style.statisticsDivItem}>
            456 commitments
          </ListGroupItem>
        </ListGroup>
        <Button color="primary" className="mt-5" block>
          View Efforts
        </Button>
      </CardBody>
    </Card>
  );
};

LocationCard.propTypes = {
  location: PropTypes.string,
  address: PropTypes.string,
};

LocationCard.defaultProps = {
  location: '',
  address: '',
};

export default LocationCard;
