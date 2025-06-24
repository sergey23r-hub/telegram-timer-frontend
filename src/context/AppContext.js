import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group A' },
    { id: 2, name: 'Group B' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', groupId: 1 },
    { id: 2, name: 'Task 2', groupId: 2 }
  ]);

  const [timers, setTimers] = useState([
    { id: 1, name: 'Timer 1', taskId: 1, duration: 60 },
    { id: 2, name: 'Timer 2', taskId: 2, duration: 120 }
  ]);

  return (
    <AppContext.Provider value={{ groups, setGroups, tasks, setTasks, timers, setTimers }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
