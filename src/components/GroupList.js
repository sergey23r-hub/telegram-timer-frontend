import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const GroupList = () => {
  const { groups, addGroup } = useAppContext();
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = () => {
    if (groupName.trim() !== "") {
      addGroup(groupName.trim());
      setGroupName("");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Groups</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-grow mr-2"
          placeholder="New group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleAddGroup} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Group
        </button>
      </div>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className="mb-2">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
