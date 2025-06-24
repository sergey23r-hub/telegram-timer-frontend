import React, { useContext } from 'react';
import { LanguageContext } from '../App.js';

export default function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div>
      <h2>Settings Component</h2>
      <button onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}>
        {language === 'ru' ? 'Сменить на English' : 'Switch to Russian'}
      </button>
    </div>
  );
}