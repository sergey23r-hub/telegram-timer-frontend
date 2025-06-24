import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import GroupItem from "./GroupItem";

function GroupList() {
  const { groups, addGroup } = useContext(AppContext);

  return (
    <div className="space-y-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={addGroup}
      >
        Добавить группу
      </button>
      {groups.map(group => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
}

export default GroupList;
