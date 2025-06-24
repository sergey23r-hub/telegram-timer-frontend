import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ groupId, tasks }) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} groupId={groupId} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
