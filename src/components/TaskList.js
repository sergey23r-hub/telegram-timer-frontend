import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TimerList from './TimerList';

const TaskList = ({ groupId }) => {
  const { tasks, addTask, removeTask } = useAppContext();
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask(groupId, taskName);
      setTaskName('');
    }
  };

  const filteredTasks = tasks.filter(task => task.groupId === groupId);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Название задачи"
          className="p-2 border rounded w-full"
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white px-4 py-2 rounded">
          Добавить
        </button>
      </div>

      {filteredTasks.map((task) => (
        <div key={task.id} className="p-4 border rounded bg-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">{task.name}</h3>
            <button onClick={() => removeTask(task.id)} className="text-red-500">
              Удалить
            </button>
          </div>
          <TimerList taskId={task.id} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
