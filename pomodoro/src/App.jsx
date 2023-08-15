import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';

function Break(props) {
  const { increment, decrement, length } = props;
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
  );
}

function Session(props) {
  const { increment, decrement, length } = props;
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
  );
}

function Timer(props) {
  const { time, mode } = props;

  const min = Math.floor(time / 1000 / 60);
  const sec = Math.floor((time / 1000) % 60);
  return (
    <div id="timer">
      <p id="timer-label">{mode}</p>
      <p id="time-left">
        {min}
        :
        {sec.toString().length === 1 ? `0${sec}` : sec}
      </p>
    </div>
  );
}

export default function App() {
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [mode, setMode] = useState('session');
  const [timeLeft, setTimeLeft] = useState();
  const [isActive, setIsActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [beep] = useState(
    new Audio('https://freesound.org/data/previews/523/523960_350703-lq.mp3'),
  );
  const [beepPlaying, setBeepPlaying] = useState(false);

  /* ########## USE EFFECT HOOKS ########## */
  useEffect(() => {
    setTimeLeft(mode == 'session' ? sessionLength * 1000 : breakLength * 1000);
  }, [sessionLength, breakLength]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 1) {
      setTimeLeft(
        mode == 'session'
          ? sessionLength * 1000 - timeSpent
          : breakLength * 1000 - timeSpent,
      );

      interval = setInterval(() => {
        setTimeSpent((timeSpent) => timeSpent + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (timeLeft === 0) {
      beep.play();
      setBeepPlaying(true);
      setTimeSpent(0);
      setMode((mode) => (mode == 'session' ? 'break' : 'session'));
      setTimeLeft(
        mode == 'session' ? sessionLength * 1000 : breakLength * 1000,
      );
    }
    return () => clearInterval(interval);
  }, [isActive, timeSpent]);

  useEffect(() => {
    beep.addEventListener('ended', () => setBeepPlaying(false));
    return () => {
      beep.addEventListener('ended', () => setBeepPlaying(false));
    };
  }, []);

  /* ########## FUNCTIONS ########## */
  function decrementBreakLength() {
    const decreasedBreakLength = breakLength - 60 > 60 ? breakLength - 60 : 60;
    setBreakLength(decreasedBreakLength);
  }

  function incrementBreakLength() {
    const incrementedBreakLength = breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60;
    setBreakLength(incrementedBreakLength);
  }

  function decrementSessionLength() {
    const decreasedSessionLength = sessionLength - 60 > 60 ? sessionLength - 60 : 60;

    setSessionLength(decreasedSessionLength);
  }

  function incrementSessionLength() {
    const incrementedSessionLength = sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60;
    setSessionLength(incrementedSessionLength);
  }

  function reset() {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(mode == 'session' ? sessionLength * 1000 : breakLength * 1000);

    if (isActive) {
      setIsActive(false);
      setTimeSpent(0);
    }

    if (beepPlaying) {
      beep.pause();
      beep.currentTime = 0;
      setBeepPlaying(false);
    }
  }

  function toggleIsActive() {
    setIsActive(!isActive);
  }

  return (
    <Container className="text-center">
      <h1>Pomodoro Clock</h1>

      <Timer time={timeLeft} mode={mode} />
      <div className="buttons">
        <Button onClick={toggleIsActive} id="start_stop">
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={reset} id="reset" variant="danger">
          Reset
        </Button>
      </div>
      <Row className="options">
        <Break
          length={breakLength}
          decrement={decrementBreakLength}
          increment={incrementBreakLength}
        />
        <Session
          length={sessionLength}
          decrement={decrementSessionLength}
          increment={incrementSessionLength}
        />
      </Row>
    </Container>
  );
}
