import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";

function TimerItem({ groupId, taskId, timer }) {
  const { updateTimer } = useContext(AppContext);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        updateTimer(groupId, taskId, timer.id, timer.timeLeft - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, groupId, taskId, timer, updateTimer]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    updateTimer(groupId, taskId, timer.id, timer.duration);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="p-4 border rounded-lg flex justify-between items-center bg-white shadow">
      <div className="text-lg font-semibold">{timer.name}</div>
      <div className="text-xl font-mono">{formatTime(timer.timeLeft)}</div>
      <div className="space-x-2">
        <button onClick={handleStartPause} className="px-3 py-1 bg-green-500 text-white rounded">
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset} className="px-3 py-1 bg-red-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
}

export default TimerItem;
