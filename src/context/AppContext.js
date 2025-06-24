import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Рабочие задачи' },
    { id: 2, name: 'Личное развитие' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, groupId: 1, name: 'Написать отчет' },
    { id: 2, groupId: 2, name: 'Прочитать книгу' }
  ]);

  const [timers, setTimers] = useState([
    { id: 1, taskId: 1, name: 'Помидорка 1', duration: 25 * 60 },
    { id: 2, taskId: 2, name: 'Помидорка 2', duration: 45 * 60 }
  ]);

  return (
    <AppContext.Provider value={{ groups, tasks, timers }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
