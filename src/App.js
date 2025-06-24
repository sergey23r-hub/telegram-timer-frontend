import React, { useState } from 'react';
import Timers from './components/Timers.js';
import Tasks from './components/Tasks.js';
import Settings from './components/Settings.js';

export const LanguageContext = React.createContext();

export default function App() {
  const [activeTab, setActiveTab] = useState('timers');
  const [language, setLanguage] = useState('ru');

  const texts = {
    ru: { timers: 'Таймеры', tasks: 'Задачи', settings: 'Настройки' },
    en: { timers: 'Timers', tasks: 'Tasks', settings: 'Settings' }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="p-4">
        <div className="flex justify-around mb-4">
          <button onClick={() => setActiveTab('timers')}>{texts[language].timers}</button>
          <button onClick={() => setActiveTab('tasks')}>{texts[language].tasks}</button>
          <button onClick={() => setActiveTab('settings')}>{texts[language].settings}</button>
        </div>

        {activeTab === 'timers' && <Timers />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </LanguageContext.Provider>
  );
}