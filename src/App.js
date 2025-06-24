import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [timers, setTimers] = useState(() => {
    const saved = localStorage.getItem('timers');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const addTimer = () => {
    if (title && duration > 0) {
      setTimers([...timers, {
        id: Date.now(),
        title,
        duration,
        remaining: duration,
        isRunning: false
      }]);
      setTitle('');
      setDuration(0);
    }
  };

  const toggleTimer = (id) => {
    setTimers(timers.map(timer => {
      if (timer.id === id) {
        return { ...timer, isRunning: !timer.isRunning };
      }
      return timer;
    }));
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(timers => timers.map(timer => {
        if (timer.isRunning && timer.remaining > 0) {
          return { ...timer, remaining: timer.remaining - 1 };
        } else if (timer.isRunning && timer.remaining === 0) {
          return { ...timer, isRunning: false };
        }
        return timer;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Мульти-таймер</h1>

      <div className="flex mb-4">
        <input 
          type="text" 
          placeholder="Название таймера" 
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 mr-2 flex-1 rounded"
        />
        <input 
          type="number" 
          placeholder="Длительность (секунд)" 
          value={duration}
          onChange={e => setDuration(parseInt(e.target.value))}
          className="border p-2 mr-2 w-40 rounded"
        />
        <button onClick={addTimer} className="bg-blue-500 text-white px-4 rounded">
          Добавить
        </button>
      </div>

      <AnimatePresence>
        {timers.map(timer => (
          <motion.div 
            key={timer.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="border p-4 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{timer.title}</h2>
              <p>Осталось: {timer.remaining} сек.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleTimer(timer.id)} className="bg-green-500 text-white px-3 rounded">
                {timer.isRunning ? 'Стоп' : 'Старт'}
              </button>
              <button onClick={() => deleteTimer(timer.id)} className="bg-red-500 text-white px-3 rounded">
                Удалить
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
