import React, { useEffect, useState, useRef } from 'react';

export default function TimerItem({ timer, updateTimer, deleteTimer }) {
  const [timeLeft, setTimeLeft] = useState(timer.seconds);
  const [isRunning, setIsRunning] = useState(timer.isRunning);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    updateTimer(timer.id, { ...timer, seconds: timeLeft, isRunning });
  }, [timeLeft, isRunning]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="border p-3 mb-3 rounded shadow">
      <div className="font-bold mb-2">{timer.label}</div>
      <div className="text-2xl mb-2">{formatTime()}</div>
      <div className="flex gap-2">
        <button onClick={() => setIsRunning(!isRunning)} className="bg-green-500 text-white px-2 py-1 rounded">
          {isRunning ? 'Пауза' : 'Старт'}
        </button>
        <button onClick={() => { setTimeLeft(timer.seconds); setIsRunning(false); }} className="bg-yellow-500 text-white px-2 py-1 rounded">
          Сброс
        </button>
        <button onClick={() => deleteTimer(timer.id)} className="bg-red-500 text-white px-2 py-1 rounded">
          Удалить
        </button>
      </div>
    </div>
  );
}