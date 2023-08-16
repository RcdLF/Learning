import React from 'react'
import { Button, Col } from 'react-bootstrap'

export default function Session ({ increment, decrement, length }) {
  return (
      <Col md={{ span: 4, offset: 4 }}>
        <p id="session-label">Session</p>
        <Button onClick={decrement} id="session-decrement" variant="info">
          -
        </Button>
        <span id="session-length">{length / 60}</span>
        <Button onClick={increment} id="session-increment" variant="info">
          +
        </Button>
      </Col>
  )
}
