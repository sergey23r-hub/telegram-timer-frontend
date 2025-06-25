import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const TaskList = ({ groupId }) => {
  const { groups, addTask } = useAppContext();
  const group = groups.find(g => g.id === groupId);
  const [taskName, setTaskName] = useState('');

  if (!group) {
    return <div>Group not found</div>;
  }

  const handleAddTask = () => {
    if (taskName.trim() === '') return;
    addTask(groupId, taskName);
    setTaskName('');
  };

  return (
    <div className="p-4 border rounded bg-white mt-4">
      <h3 className="text-lg font-semibold mb-2">Tasks in {group.name}</h3>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border p-2 mr-2"
          placeholder="New task name"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
      <ul>
        {group.tasks.map(task => (
          <li key={task.id} className="p-2 border-b">{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
