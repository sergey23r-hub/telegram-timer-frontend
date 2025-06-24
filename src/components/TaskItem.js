import React from "react";

export default function TaskItem({ task, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-2 mb-2 shadow">
      <span>{task.name}</span>
      <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">
        Удалить
      </button>
    </div>
  );
}
