import React, { useState, useEffect } from 'react';
import TimerItem from './TimerItem';

export default function Timers() {
  const [timers, setTimers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTimer = () => {
    const minutes = parseInt(inputValue);
    if (!isNaN(minutes) && minutes > 0) {
      const newTimer = {
        id: Date.now(),
        remaining: minutes * 60,
        isRunning: false,
      };
      setTimers([...timers, newTimer]);
      setInputValue('');
    }
  };

  const removeTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  const toggleTimer = (id) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.remaining > 0) {
            return { ...timer, remaining: timer.remaining - 1 };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Введите время (мин)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
        <button onClick={addTimer} className="bg-green-500 text-white px-4 py-2 rounded">
          Добавить
        </button>
      </div>

      <div className="space-y-4">
        {timers.map((timer) => (
          <TimerItem
            key={timer.id}
            timer={timer}
            toggleTimer={toggleTimer}
            removeTimer={removeTimer}
          />
        ))}
      </div>
    </div>
  );
}
