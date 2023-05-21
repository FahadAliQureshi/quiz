import React, { useState, useEffect } from "react";

const Stopwatch = ({ elapsedTime, setElapsedTime }) => {
  const [isRunning, setIsRunning] = useState(true);
  //   const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    return `${hours.toString().padStart(2, "0")}:
            ${minutes.toString().padStart(2, "0")}:
            ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div>{formatTime(elapsedTime)}</div>
      {/* <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button> */}
      {/* <button onClick={handleReset}>Reset</button> */}
    </div>
  );
};

export default Stopwatch;
