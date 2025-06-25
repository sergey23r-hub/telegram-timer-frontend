import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskList from './TaskList';

const GroupList = () => {
  const { groups, addGroup, removeGroup } = useAppContext();
  const [groupName, setGroupName] = useState('');

  const handleAddGroup = () => {
    if (groupName.trim()) {
      addGroup(groupName);
      setGroupName('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Название группы"
          className="p-2 border rounded w-full"
        />
        <button onClick={handleAddGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
          Добавить
        </button>
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="p-4 border rounded bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <button onClick={() => removeGroup(group.id)} className="text-red-500">
                Удалить
              </button>
            </div>
            <TaskList groupId={group.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
