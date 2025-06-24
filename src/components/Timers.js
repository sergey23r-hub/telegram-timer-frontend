import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';

export default function Timers() {
  const { language } = useContext(LanguageContext);
  const [timers, setTimers] = useState([]);
  const [time, setTime] = useState('');

  const texts = {
    ru: { add: 'Добавить таймер', placeholder: 'Введите время (в минутах)', remove: 'Удалить' },
    en: { add: 'Add Timer', placeholder: 'Enter time (minutes)', remove: 'Remove' }
  };

  const addTimer = () => {
    if (time) {
      setTimers([...timers, parseInt(time)]);
      setTime('');
    }
  };

  const removeTimer = (index) => {
    setTimers(timers.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder={texts[language].placeholder}
        className="border p-1 mr-2"
      />
      <button onClick={addTimer} className="bg-blue-500 text-white px-2 py-1 rounded">
        {texts[language].add}
      </button>

      <ul className="mt-4">
        {timers.map((t, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {t} min
            <button onClick={() => removeTimer(index)} className="text-red-500">
              {texts[language].remove}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}