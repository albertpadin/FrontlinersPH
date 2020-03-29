import React from 'react';
import { Col, Spinner } from 'reactstrap';
import style from './styles.module.css';

const Loader = () => {
  return (
    <Col
      xs={12}
      md={12}
      className={`${style.loader} d-flex justify-content-center`}
    >
      <div className="text-center justify-content-center align-self-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} />
        <br />
        <span>Loading...</span>
      </div>
    </Col>
  );
};

export default Loader;
