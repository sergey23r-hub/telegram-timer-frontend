import React, { useContext } from 'react';
import { LanguageContext } from '../App';

export default function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div>
      <h2>Language</h2>
      <button className="mr-2" onClick={() => setLanguage('ru')}>Русский</button>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
}