import React from 'react';
import { AppProvider } from './context/AppContext';
import GroupList from './components/GroupList';
import TaskList from './components/TaskList';
import TimerList from './components/TimerList';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Telegram Timer</h1>
        <GroupList />
      </div>
    </AppProvider>
  );
}

export default App;
