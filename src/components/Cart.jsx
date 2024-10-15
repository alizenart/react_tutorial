import React from 'react';
import './Cart.css';
import { Card, Button } from 'react-bootstrap';

const Cart = ({ selected }) => (
  <div className="cart">
    {
      selected.length === 0
        ? <h2>No courses selected</h2>
        : selected.map(course => (
            <Card key={`${course.number}-${course.term}`} className="mb-3">
              <Card.Body>
                <Card.Title>{course.number} - {course.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Term: {course.term}</Card.Subtitle>
                <Card.Text>
                  Meeting Time: {course.meets}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
    }
  </div>
);

export default Cart;
