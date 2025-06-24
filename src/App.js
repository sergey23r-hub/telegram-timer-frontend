import React, { useState, useEffect } from 'react';

function App() {
  const [timers, setTimers] = useState([]);
  const [input, setInput] = useState('');

  const addTimer = () => {
    if (!input || isNaN(input)) return;
    const newTimer = { id: Date.now(), time: parseInt(input) * 60, running: false };
    setTimers([...timers, newTimer]);
    setInput('');
  };

  const toggleTimer = (id) => {
    setTimers(timers.map(timer => (
      timer.id === id ? { ...timer, running: !timer.running } : timer
    )));
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev =>
        prev.map(timer =>
          timer.running && timer.time > 0
            ? { ...timer, time: timer.time - 1 }
            : timer
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Мой Таймер</h1>
      <div className="flex space-x-2 mb-6">
        <input
          type="number"
          placeholder="Минуты"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 w-32"
        />
        <button onClick={addTimer} className="bg-indigo-500 text-white rounded px-4 py-2 hover:bg-indigo-600">
          Добавить
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timers.map((timer) => (
          <div key={timer.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-semibold mb-2">
              {Math.floor(timer.time / 60)}:{String(timer.time % 60).padStart(2, '0')}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => toggleTimer(timer.id)} className="bg-green-500 text-white rounded px-3 py-1">
                {timer.running ? 'Пауза' : 'Старт'}
              </button>
              <button onClick={() => deleteTimer(timer.id)} className="bg-red-500 text-white rounded px-3 py-1">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;