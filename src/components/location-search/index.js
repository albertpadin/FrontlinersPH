import React from 'react';
import { Button, Col, InputGroup, Row } from 'reactstrap';

const LocationSearch = () => {
  return (
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
  );
};

export default LocationSearch;
