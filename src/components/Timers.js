import React, { useState } from 'react';
import TimerItem from './TimerItem';

export default function Timers() {
  const [timers, setTimers] = useState([
    { id: 1, name: 'Таймер 1', time: 300 },
    { id: 2, name: 'Таймер 2', time: 600 }
  ]);

  const updateTimer = (id, newTime) => {
    setTimers((prev) =>
      prev.map((timer) => (timer.id === id ? { ...timer, time: newTime } : timer))
    );
  };

  return (
    <div className="space-y-4">
      {timers.map((timer) => (
        <TimerItem key={timer.id} timer={timer} updateTimer={updateTimer} />
      ))}
    </div>
  );
}
