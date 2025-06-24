import React, { useState } from 'react';
import TimerItem from './components/TimerItem';
import TaskItem from './components/TaskItem';
import GroupItem from './components/GroupItem';
import './index.css';

function App() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Рабочие задачи',
      tasks: [
        {
          id: 1,
          name: 'Подготовка презентации',
          timers: [
            { id: 1, name: 'Исследование', duration: 25 },
            { id: 2, name: 'Слайды', duration: 15 }
          ]
        },
        {
          id: 2,
          name: 'Звонок с клиентом',
          timers: [
            { id: 3, name: 'Подготовка вопросов', duration: 10 }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Telegram Timer</h1>
      <div className="space-y-4">
        {groups.map(group => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

export default App;
