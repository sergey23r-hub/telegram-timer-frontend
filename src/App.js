import React from 'react';
import { AppProvider } from './context/AppContext';
import GroupList from './components/GroupList';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Telegram Timer</h1>
        <GroupList />
      </div>
    </AppProvider>
  );
}

export default App;
