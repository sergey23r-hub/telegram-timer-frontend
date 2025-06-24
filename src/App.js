import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../App';

export default function Timers() {
  const { language } = useContext(LanguageContext);
  const [timers, setTimers] = useState(() => {
    const saved = localStorage.getItem('timers');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const addTimer = () => {
    const minutes = parseInt(input);
    if (!isNaN(minutes) && minutes > 0) {
      const newTimer = {
        id: Date.now(),
        remaining: minutes * 60,
        running: false,
      };
      setTimers([...timers, newTimer]);
      setInput('');
    }
  };

  const toggleTimer = (id) => {
    setTimers(timers.map(timer => timer.id === id ? { ...timer, running: !timer.running } : timer));
  };

  const removeTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(timers => timers.map(timer => {
        if (timer.running && timer.remaining > 0) {
          return { ...timer, remaining: timer.remaining - 1 };
        } else {
          return timer;
        }
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const texts = {
    ru: {
      placeholder: 'Введите время (в минутах)',
      add: 'Добавить таймер',
      start: 'Старт',
      pause: 'Пауза',
      delete: 'Удалить'
    },
    en: {
      placeholder: 'Enter time (minutes)',
      add: 'Add Timer',
      start: 'Start',
      pause: 'Pause',
      delete: 'Delete'
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder={texts[language].placeholder} 
      />
      <button onClick={addTimer}>{texts[language].add}</button>

      <ul>
        {timers.map(timer => (
          <li key={timer.id}>
            {formatTime(timer.remaining)} 
            <button onClick={() => toggleTimer(timer.id)}>
              {timer.running ? texts[language].pause : texts[language].start}
            </button>
            <button onClick={() => removeTimer(timer.id)}>{texts[language].delete}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
