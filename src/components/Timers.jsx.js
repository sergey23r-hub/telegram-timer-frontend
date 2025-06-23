import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../App';

export default function Timers() {
  const { language } = useContext(LanguageContext);
  const [timers, setTimers] = useState([]);
  const [dateTime, setDateTime] = useState('');

  const texts = {
    ru: {
      create: 'Создать таймер',
      yourTimers: 'Ваши таймеры',
      delete: 'Удалить'
    },
    en: {
      create: 'Create Timer',
      yourTimers: 'Your Timers',
      delete: 'Delete'
    }
  };

  const fetchTimers = async () => {
    const initData = window.Telegram.WebApp.initData;
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/timers/list`, { initData });
    setTimers(res.data.timers);
  };

  const createTimer = async () => {
    if (!dateTime) return;
    const initData = window.Telegram.WebApp.initData;
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/timers`, { initData, dateTime });
    setDateTime('');
    fetchTimers();
  };

  const deleteTimer = async (id) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/timers/delete`, { id });
    fetchTimers();
  };

  useEffect(() => {
    fetchTimers();
  }, []);

  return (
    <div>
      <h2>{texts[language].create}</h2>
      <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
      <button className="ml-2" onClick={createTimer}>OK</button>

      <h3 className="mt-4">{texts[language].yourTimers}</h3>
      <ul>
        {timers.map(timer => (
          <li key={timer.id} className="my-1">
            {new Date(timer.dateTime).toLocaleString()}
            <button className="ml-2 text-red-600" onClick={() => deleteTimer(timer.id)}>
              {texts[language].delete}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}