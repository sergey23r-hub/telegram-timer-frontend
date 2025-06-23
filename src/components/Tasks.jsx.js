import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../App';

export default function Tasks() {
  const { language } = useContext(LanguageContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const texts = {
    ru: {
      add: 'Добавить задачу',
      yourTasks: 'Ваши задачи'
    },
    en: {
      add: 'Add Task',
      yourTasks: 'Your Tasks'
    }
  };

  const fetchTasks = async () => {
    const initData = window.Telegram.WebApp.initData;
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/list`, { initData });
    setTasks(res.data.tasks);
  };

  const addTask = async () => {
    if (!newTask) return;
    const initData = window.Telegram.WebApp.initData;
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, { initData, text: newTask });
    setNewTask('');
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/complete`, { id: task.id, completed: task.completed ? 0 : 1 });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>{texts[language].yourTasks}</h2>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button className="ml-2" onClick={addTask}>{texts[language].add}</button>

      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task.id} className="my-1">
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} /> {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}