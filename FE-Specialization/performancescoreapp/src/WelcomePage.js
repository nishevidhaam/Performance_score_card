import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-background">
      <Container className="welcome-container">
        <Row>
          <Col>
            <h1
            style={{
               
                fontSize: '50px',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'blue',
              }}>Welcome to Performance Scoreboard</h1>
            <p 
            style={{
               
                fontSize: '25px',
                
                fontStyle: 'italic',
                
                color: 'green',
              }}
            >Rate the employees based on 8 core values of Incedo</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button style={{
               
               
               fontWeight: 'bold',
              
               
              
             }} className ="button button1" variant="primary" href="/login">Login</Button>
          </Col>
          <Col md={6}>
            <Button  style={{
               
               
               fontWeight: 'bold',
              
               
              
             }}className ="button button2" variant="success" href="/signup">Sign up</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomePage;

