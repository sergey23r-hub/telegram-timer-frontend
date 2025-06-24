import React, { useState } from "react";
import TimerList from "./TimerList";
import { useAppContext } from "../context/AppContext";

function TaskItem({ groupId, task }) {
  const { updateTaskName, deleteTask, addTimer } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleSave = () => {
    updateTaskName(groupId, task.id, taskName);
    setIsEditing(false);
  };

  return (
    <div className="border p-2 rounded shadow-sm bg-white">
      {isEditing ? (
        <div className="flex gap-2">
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border p-1 flex-grow"
          />
          <button onClick={handleSave} className="bg-green-500 text-white p-1 px-3 rounded">
            Сохранить
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <h3 className="text-lg">{task.name}</h3>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-400 text-white p-1 px-3 rounded">
              Редактировать
            </button>
            <button onClick={() => deleteTask(groupId, task.id)} className="bg-red-500 text-white p-1 px-3 rounded">
              Удалить
            </button>
            <button onClick={() => addTimer(groupId, task.id)} className="bg-blue-500 text-white p-1 px-3 rounded">
              + Таймер
            </button>
          </div>
        </div>
      )}

      <TimerList groupId={groupId} taskId={task.id} timers={task.timers} />
    </div>
  );
}

export default TaskItem;
