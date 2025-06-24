import React, { useState } from "react";
import TimerItem from "./TimerItem";
import TaskItem from "./TaskItem";

export default function GroupItem({ group, onDeleteGroup, onAddTimer, onDeleteTimer }) {
  const [newTimerName, setNewTimerName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddTimer = () => {
    if (newTimerName.trim() === "") return;
    onAddTimer(group.id, newTimerName);
    setNewTimerName("");
  };

  const handleAddTask = () => {
    if (newTaskName.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), name: newTaskName }]);
    setNewTaskName("");
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{group.name}</h2>
        <button onClick={() => onDeleteGroup(group.id)} className="bg-red-500 text-white px-2 py-1 rounded">
          Удалить группу
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Название таймера"
          value={newTimerName}
          onChange={(e) => setNewTimerName(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
        />
        <button onClick={handleAddTimer} className="bg-green-500 text-white px-3 py-1 rounded">
          Добавить таймер
        </button>
      </div>

      <div className="mb-4">
        {group.timers.map((timer) => (
          <TimerItem key={timer.id} timer={timer} onDelete={() => onDeleteTimer(group.id, timer.id)} />
        ))}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Задачи:</h3>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Название задачи"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
          />
          <button onClick={handleAddTask} className="bg-blue-500 text-white px-3 py-1 rounded">
            Добавить задачу
          </button>
        </div>
        <div>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
}
