import React from 'react';
import { useAppContext } from '../context/AppContext';

const GroupList = () => {
  const { groups } = useAppContext();

  if (groups.length === 0) {
    return <div className="p-4 text-center text-gray-500">Пока нет ни одной группы</div>;
  }

  return (
    <div className="p-4">
      {groups.map(group => (
        <div key={group.id} className="p-4 mb-2 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">{group.name}</h2>
          <ul className="mt-2 list-disc list-inside">
            {group.tasks.map(task => (
              <li key={task.id} className="text-gray-700">{task.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
