import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskList from './TaskList';

const GroupList = () => {
  const { state, dispatch } = useAppContext();
  const [groupName, setGroupName] = useState('');

  const addGroup = () => {
    if (groupName.trim() === '') return;
    dispatch({ type: 'ADD_GROUP', payload: { id: Date.now(), name: groupName } });
    setGroupName('');
  };

  const removeGroup = (groupId) => {
    dispatch({ type: 'REMOVE_GROUP', payload: groupId });
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Название группы"
        />
        <button onClick={addGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
          Добавить группу
        </button>
      </div>

      {state.groups.map((group) => (
        <div key={group.id} className="p-4 border rounded bg-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">{group.name}</h2>
            <button onClick={() => removeGroup(group.id)} className="text-red-500">
              Удалить
            </button>
          </div>
          <TaskList groupId={group.id} />
        </div>
      ))}
    </div>
  );
};

export default GroupList;
