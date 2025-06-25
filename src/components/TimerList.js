import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const TimerList = ({ taskId }) => {
  const { timers, addTimer, removeTimer } = useAppContext();
  const [timerName, setTimerName] = useState('');

  const handleAddTimer = () => {
    if (timerName.trim()) {
      addTimer(taskId, timerName);
      setTimerName('');
    }
  };

  const filteredTimers = timers.filter(timer => timer.taskId === taskId);

  return (
    <div className="space-y-2">
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={timerName}
          onChange={(e) => setTimerName(e.target.value)}
          placeholder="Название таймера"
          className="p-2 border rounded w-full"
        />
        <button onClick={handleAddTimer} className="bg-blue-500 text-white px-4 py-2 rounded">
          Добавить
        </button>
      </div>

      {filteredTimers.map((timer) => (
        <div key={timer.id} className="flex justify-between items-center p-2 border rounded bg-white">
          <span>{timer.name}</span>
          <button onClick={() => removeTimer(timer.id)} className="text-red-500">
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};

export default TimerList;
