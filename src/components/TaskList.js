import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TimerList from './TimerList';

const TaskList = ({ groupId }) => {
  const { tasks, addTask } = useAppContext();
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      addTask(groupId, newTaskName.trim());
      setNewTaskName('');
    }
  };

  const filteredTasks = tasks.filter((task) => task.groupId === groupId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 mt-4">Задачи</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Название задачи"
          className="p-2 border rounded w-full"
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
          Добавить
        </button>
      </div>

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div key={task.id} className="p-2 border rounded bg-white">
            <div className="font-semibold">{task.name}</div>
            <TimerList taskId={task.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
