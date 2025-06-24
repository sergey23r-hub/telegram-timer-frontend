import React, { useEffect, useState } from 'react';

export default function TimerItem({ id, initialMinutes, removeTimer }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    if (timeLeft === 0 && isRunning) {
      alert("⏰ Таймер завершен!");
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 flex justify-between items-center">
      <div className="text-2xl font-mono">{formatTime(timeLeft)}</div>
      <div className="flex gap-2">
        <button onClick={() => setIsRunning(!isRunning)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          {isRunning ? 'Пауза' : 'Старт'}
        </button>
        <button onClick={() => setTimeLeft(initialMinutes * 60)} className="px-4 py-2 bg-yellow-400 text-white rounded-lg">
          Сброс
        </button>
        <button onClick={() => removeTimer(id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
          Удалить
        </button>
      </div>
    </div>
  );
}
