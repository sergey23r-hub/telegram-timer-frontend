import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const addGroup = (title) => {
    const newGroup = { id: Date.now(), title, tasks: [] };
    setGroups((prev) => [...prev, newGroup]);
  };

  const removeGroup = (groupId) => {
    setGroups((prev) => prev.filter((group) => group.id !== groupId));
  };

  const updateGroup = (groupId, updatedGroup) => {
    setGroups((prev) =>
      prev.map((group) => (group.id === groupId ? updatedGroup : group))
    );
  };

  const addTask = (groupId, title) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: [...group.tasks, { id: Date.now(), title, timers: [] }],
            }
          : group
      )
    );
  };

  const removeTask = (groupId, taskId) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.filter((task) => task.id !== taskId),
            }
          : group
      )
    );
  };

  const updateTask = (groupId, taskId, updatedTask) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId ? updatedTask : task
              ),
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
                  ? {
                      ...task,
                      timers: [...task.timers, { id: Date.now(), name: timerName }],
                    }
                  : task
              ),
            }
          : group
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        groups,
        addGroup,
        removeGroup,
        updateGroup,
        addTask,
        removeTask,
        updateTask,
        addTimer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
