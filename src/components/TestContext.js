import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TestContext = () => {
  const { groups } = useContext(AppContext);

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Тест контекста</h2>
      <pre>{JSON.stringify(groups, null, 2)}</pre>
    </div>
  );
};

export default TestContext;
