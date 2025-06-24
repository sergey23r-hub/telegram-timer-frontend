import React, { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import TimerItem from "./components/TimerItem";

function AppContent() {
  const { data, addGroup, addTask, addTimer } = useContext(AppContext);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Группы / Задачи / Таймеры</h1>
      <button onClick={addGroup} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Добавить группу</button>

      {data.map((group) => (
        <div key={group.id} className="border p-4 rounded-lg bg-gray-100 space-y-4">
          <h2 className="text-2xl font-bold">{group.name}</h2>
          <button onClick={() => addTask(group.id)} className="px-3 py-1 bg-purple-500 text-white rounded">Добавить задачу</button>

          {group.tasks.map((task) => (
            <div key={task.id} className="ml-4 border p-4 rounded bg-white space-y-2">
              <h3 className="text-xl font-semibold">{task.name}</h3>
              <button onClick={() => addTimer(group.id, task.id)} className="px-3 py-1 bg-green-500 text-white rounded">Добавить таймер</button>

              <div className="space-y-2">
                {task.timers.map((timer) => (
                  <TimerItem key={timer.id} groupId={group.id} taskId={task.id} timer={timer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
