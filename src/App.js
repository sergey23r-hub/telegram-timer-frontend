import React, { useState } from 'react';
import TimerItem from './components/TimerItem';
import GroupItem from './components/GroupItem';
import TaskItem from './components/TaskItem';
import './index.css';

const initialGroups = [
  { id: 1, name: 'Работа' },
  { id: 2, name: 'Здоровье' },
  { id: 3, name: 'Учёба' }
];

const initialTimers = [
  { id: 1, name: 'Сделать задачу 1', time: 600, groupId: 1 },
  { id: 2, name: 'Отдохнуть', time: 300, groupId: 2 },
  { id: 3, name: 'Прочитать книгу', time: 1800, groupId: 3 }
];

export default function App() {
  const [groups, setGroups] = useState(initialGroups);
  const [timers, setTimers] = useState(initialTimers);
  const [activeGroupId, setActiveGroupId] = useState(1);

  const addGroup = (name) => {
    const newGroup = { id: Date.now(), name };
    setGroups([...groups, newGroup]);
  };

  const addTimer = (name, time) => {
    const newTimer = { id: Date.now(), name, time, groupId: activeGroupId };
    setTimers([...timers, newTimer]);
  };

  const updateTimer = (id, time) => {
    setTimers(timers.map(timer => timer.id === id ? { ...timer, time } : timer));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Менеджер Таймеров</h1>

      <div className="mb-4">
        <h2 className="text-xl mb-2">Группы</h2>
        <div className="flex gap-2 mb-4">
          {groups.map(group => (
            <GroupItem
              key={group.id}
              group={group}
              isActive={group.id === activeGroupId}
              onSelect={() => setActiveGroupId(group.id)}
            />
          ))}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => {
              const name = prompt('Введите название группы:');
              if (name) addGroup(name);
            }}
          >
            + Группа
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl mb-2">Таймеры группы</h2>
        <div className="grid grid-cols-1 gap-4">
          {timers.filter(timer => timer.groupId === activeGroupId).map(timer => (
            <TimerItem key={timer.id} timer={timer} updateTimer={updateTimer} />
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            const name = prompt('Введите название таймера:');
            const timeStr = prompt('Введите время в секундах:');
            const time = parseInt(timeStr);
            if (name && !isNaN(time)) {
              addTimer(name, time);
            }
          }}
        >
          + Таймер
        </button>
      </div>
    </div>
  );
}
