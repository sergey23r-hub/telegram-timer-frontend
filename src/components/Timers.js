import React, { useState } from 'react';
import TimerItem from './TimerItem';

export default function Timers() {
  const [timers, setTimers] = useState([]);
  const [minutes, setMinutes] = useState(25);

  const addTimer = () => {
    const newTimer = { id: Date.now(), minutes };
    setTimers(prev => [...prev, newTimer]);
  };

  const removeTimer = (id) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex mb-4 gap-2">
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value) || 1))}
          className="border rounded-lg px-4 py-2 w-24"
        />
        <button onClick={addTimer} className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Добавить таймер
        </button>
      </div>
      {timers.map(timer => (
        <TimerItem key={timer.id} id={timer.id} initialMinutes={timer.minutes} removeTimer={removeTimer} />
      ))}
    </div>
  );
}
