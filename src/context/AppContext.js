import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const addGroup = (name) => {
    const newGroup = { id: Date.now(), name, tasks: [] };
    setGroups((prev) => [...prev, newGroup]);
  };

  const addTask = (groupId, taskName) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: [...group.tasks, { id: Date.now(), name: taskName, timers: [] }],
            }
          : group
      )
    );
  };

  const addTimer = (groupId, taskId, timerName) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, timers: [...task.timers, { id: Date.now(), name: timerName }] }
                  : task
              ),
            }
          : group
      )
    );
  };

  return (
    <AppContext.Provider value={{ groups, addGroup, addTask, addTimer }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
