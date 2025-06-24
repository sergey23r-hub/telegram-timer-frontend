import React from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import TimerItem from './components/TimerItem';
import TaskItem from './components/TaskItem';
import GroupItem from './components/GroupItem';

const App = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Telegram Timer App</h1>

        <AppContext.Consumer>
          {({ groups, tasks, timers }) => (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Groups</h2>
                {groups.map(group => (
                  <GroupItem key={group.id} group={group} />
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Tasks</h2>
                {tasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Timers</h2>
                {timers.map(timer => (
                  <TimerItem key={timer.id} timer={timer} />
                ))}
              </div>
            </>
          )}
        </AppContext.Consumer>
      </div>
    </AppProvider>
  );
};

export default App;
