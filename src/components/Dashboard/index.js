import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DashboardService from '../../services/DashboardService';
import './style.css';

const Dashboard = () => {
  const [displayedVal, setDisplayedVal] = useState({});
  const service = new DashboardService();

  useEffect(() => {
    service.emitOut().subscribe((newValue) => {
      setDisplayedVal({ ...newValue });
    });

    return () => {
      if (service.emitOut().unsubscribe) {
        service.emitOut().unsubscribe();
      }
      service.unsubscribe();
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <Card.Title>Temperature</Card.Title>
            <Card.Body>{displayedVal.temperature}</Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Title>Air Pressure</Card.Title>
            <Card.Body>{displayedVal.airPressure}</Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Title>Humidity</Card.Title>
            <Card.Body>{displayedVal.humidity}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
