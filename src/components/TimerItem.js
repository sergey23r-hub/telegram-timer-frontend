import React from 'react';

export default function TimerItem({ timer, toggleTimer, removeTimer }) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
      <div className="text-xl font-bold">{formatTime(timer.remaining)}</div>
      <div className="flex gap-2">
        <button
          onClick={() => toggleTimer(timer.id)}
          className={`px-4 py-2 rounded ${
            timer.isRunning ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {timer.isRunning ? 'Стоп' : 'Старт'}
        </button>
        <button
          onClick={() => removeTimer(timer.id)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
