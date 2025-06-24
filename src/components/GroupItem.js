import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TaskList from "./TaskList";

function GroupItem({ group }) {
  const { updateGroupName, removeGroup } = useContext(AppContext);

  const handleNameChange = (e) => {
    updateGroupName(group.id, e.target.value);
  };

  return (
    <div className="p-4 border rounded shadow space-y-2">
      <input
        className="w-full border p-2 rounded"
        value={group.name}
        onChange={handleNameChange}
        placeholder="Название группы"
      />
      <TaskList groupId={group.id} tasks={group.tasks} />
      <button
        className="px-4 py-1 bg-red-500 text-white rounded"
        onClick={() => removeGroup(group.id)}
      >
        Удалить группу
      </button>
    </div>
  );
}

export default GroupItem;
