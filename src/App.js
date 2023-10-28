import './App.css';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';

function App() {
  const [mins, setMins] = useState('');
  const [secs, setSecs] = useState('');
  const [timer, setTimer] = useState(0);
  const [lastTenSecs, setLastTenSecs] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let countInterval;
    if (isRunning && !paused) {
      countInterval = setInterval(() => {
        if (timer === 0) {
          clearInterval(countInterval);
          setIsRunning(false);
        } else {
          setTimer(timer -  1);
        }
      }, 1000);
    }
    if (isRunning && timer <= 10) setLastTenSecs(true);
    else setLastTenSecs(false);
    return () => clearInterval(countInterval);
  }, [isRunning, timer, paused]);

  const onTimerStart = () => {
    setTimer(Number(mins * 60) + Number(secs));
    setIsRunning(true);
  }

  const onPauseClick = () => {
    setPaused(!paused);
  }

  const onResetClick = () => {
    setIsRunning(false);
    setPaused(false);
    setTimer(0);
    setMins('');
    setSecs('');
  }


  const onMinChange = ({ target: { value } }) => {
    setMins(Number(value));
  }

  const onSecChange = ({ target: { value } }) => {
    setSecs(Number(value));
  }

  const doubleDigit = number => number.toString().padStart(2, '0');

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${doubleDigit(min)}:${doubleDigit(sec)}`;
  };

  return (
    <div className="App">
      <h3 className='title'>Countdown Timer</h3>
      <div className='inputs'>
        <Input type="number" placeholder="Minutes" onChange={onMinChange} value={mins} />
        <Input type="number" placeholder="Seconds" onChange={onSecChange} value={secs} />
      </div>
      <div className='timer'>
        <span
          style={lastTenSecs ? { color: "red" } : {}}
        >{formatTime(timer)}</span>
      </div>
      <div className="buttons">
        <Button ghost onClick={onTimerStart}>Start</Button>
        <Button ghost onClick={onPauseClick}>Pause/Resume</Button>
        <Button ghost onClick={onResetClick}>Reset</Button>
      </div>
    </div>
  );
}

export default App;
