import React from 'react'
import { Button, Col } from 'react-bootstrap'

export default function Break ({ increment, decrement, length }) {
  return (
      <Col md={4}>
        <p id="break-label">Break</p>
        <Button onClick={decrement} id="break-decrement" variant="info">
          -
        </Button>
        <span id="break-length">{length / 60}</span>
        <Button variant="info" onClick={increment} id="break-increment">
          +
        </Button>
      </Col>
  )
}
