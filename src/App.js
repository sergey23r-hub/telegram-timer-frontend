import React, { useState } from 'react';
import Timers from './components/Timers';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Таймеры</h1>
      <Timers />
    </div>
  );
}
