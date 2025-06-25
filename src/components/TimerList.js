import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const TimerList = ({ taskId }) => {
  const { timers, addTimer } = useAppContext();
  const [newTimerName, setNewTimerName] = useState('');

  const handleAddTimer = () => {
    if (newTimerName.trim() !== '') {
      addTimer(taskId, newTimerName.trim());
      setNewTimerName('');
    }
  };

  const filteredTimers = timers.filter((timer) => timer.taskId === taskId);

  return (
    <div className="ml-4">
      <h3 className="font-semibold mb-2">Таймеры</h3>

      <div className="flex mb-2">
        <input
          type="text"
          value={newTimerName}
          onChange={(e) => setNewTimerName(e.target.value)}
          placeholder="Название таймера"
          className="p-2 border rounded w-full"
        />
        <button onClick={handleAddTimer} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Добавить
        </button>
      </div>

      <div className="space-y-1">
        {filteredTimers.map((timer) => (
          <div key={timer.id} className="p-2 border rounded bg-gray-100">
            {timer.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerList;
