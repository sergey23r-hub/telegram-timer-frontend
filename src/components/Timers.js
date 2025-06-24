import React, { useState, useEffect } from 'react';
import TimerItem from './TimerItem';

export default function Timers() {
  const [timers, setTimers] = useState(() => {
    const saved = localStorage.getItem('timers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const addTimer = () => {
    const label = prompt('Введите название таймера');
    const minutes = parseInt(prompt('Введите время (минуты)'), 10);
    if (label && minutes > 0) {
      setTimers([...timers, { id: Date.now(), label, seconds: minutes * 60, isRunning: false }]);
    }
  };

  const updateTimer = (id, newTimer) => {
    setTimers(timers.map(timer => timer.id === id ? newTimer : timer));
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (
    <div>
      <button onClick={addTimer} className="mb-4 bg-blue-500 text-white px-3 py-1 rounded">Добавить таймер</button>
      {timers.map(timer => (
        <TimerItem key={timer.id} timer={timer} updateTimer={updateTimer} deleteTimer={deleteTimer} />
      ))}
    </div>
  );
}