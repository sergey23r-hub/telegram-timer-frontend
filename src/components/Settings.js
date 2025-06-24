import React, { useContext } from 'react';
import { LanguageContext } from '../App';

export default function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div>
      <h2 className="text-xl mb-4">Настройки</h2>
      <div>
        <button onClick={() => setLanguage('ru')} className={`px-3 py-1 rounded ${language === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Русский</button>
        <button onClick={() => setLanguage('en')} className={`ml-2 px-3 py-1 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>English</button>
      </div>
    </div>
  );
}