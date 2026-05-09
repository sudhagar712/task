import React from 'react';
import { FiPlus, FiCalendar } from 'react-icons/fi';

const TaskHeader = ({ onNewTask }) => {
  const currentDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date());

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">Projects & Tasks Planner</h1>
        <div className="flex items-center gap-2 mt-5 mb-5 font-medium mb-2 text-sm bg-blue-50 dark:bg-blue-900/20 w-fit px-3 py-1 rounded-full">
          <FiCalendar size={14} />
          <span>{currentDate}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your project assignments efficiently.</p>
      </div>
      <button
        onClick={onNewTask}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
      >
        <FiPlus size={20} />
        New Task
      </button>
    </div>
  );
};

export default TaskHeader;
