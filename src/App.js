import React from 'react';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Приложение таймеров</h1>
        <p>Тут будет выводиться список групп, задач и таймеров.</p>
      </div>
    </AppProvider>
  );
}

export default App;
