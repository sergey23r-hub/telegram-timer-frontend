import React, { useEffect, useState } from 'react';

export default function TimerItem({ timer, updateTimer }) {
  const [timeLeft, setTimeLeft] = useState(timer.time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      alert(`Таймер "${timer.name}" завершён!`);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    updateTimer(timer.id, timeLeft);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        <div className="font-bold">{timer.name}</div>
        <div className="text-lg">{formatTime(timeLeft)}</div>
      </div>
      <button
        className={`px-4 py-2 rounded text-white ${isRunning ? 'bg-red-500' : 'bg-green-500'}`}
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? 'Стоп' : 'Старт'}
      </button>
    </div>
  );
}
