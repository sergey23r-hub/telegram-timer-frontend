import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import TaskList from './components/TaskList';

const GroupList = () => {
  const { groups, addGroup } = useAppContext();
  const [groupName, setGroupName] = React.useState('');
  const [selectedGroupId, setSelectedGroupId] = React.useState(null);

  const handleAddGroup = () => {
    if (groupName.trim() === '') return;
    addGroup(groupName);
    setGroupName('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Telegram Timer</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Groups</h2>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow border p-2 mr-2"
            placeholder="New group name"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
          <button onClick={handleAddGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Group
          </button>
        </div>
        <ul>
          {groups.map(group => (
            <li
              key={group.id}
              className={`p-2 border mb-1 rounded cursor-pointer ${selectedGroupId === group.id ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedGroupId(group.id)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedGroupId && <TaskList groupId={selectedGroupId} />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <GroupList />
      </div>
    </AppProvider>
  );
}
