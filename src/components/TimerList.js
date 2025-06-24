import React from "react";
import TimerItem from "./TimerItem";

function TimerList({ groupId, taskId, timers }) {
  return (
    <div className="mt-2 space-y-2">
      {timers.map((timer) => (
        <TimerItem key={timer.id} groupId={groupId} taskId={taskId} timer={timer} />
      ))}
    </div>
  );
}

export default TimerList;
