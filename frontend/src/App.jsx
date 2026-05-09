import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Bell, Search, Filter, LayoutList, Kanban, FolderPlus, Plus, ChevronRight, ChevronDown, Folder, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import { addTask, updateTask, deleteTask } from './store/tasksSlice';

export default function App() {
  const { tasks, projects, assignees } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterText, setFilterText] = useState('');

  // Group tasks by project
  const tasksByProject = tasks.reduce((acc, task) => {
    if (!acc[task.project]) {
      acc[task.project] = [];
    }
    acc[task.project].push(task);
    return acc;
  }, {});

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.error('Task deleted successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'NOT STARTED': return 'text-slate-600 bg-slate-100';
      case 'WAITING FOR APPROVAL': return 'text-orange-600 bg-orange-100';
      case 'IN PROGRESS': return 'text-blue-600 bg-blue-100';
      case 'SUBMITTED FOR REVIEW': return 'text-purple-600 bg-purple-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW': return 'text-green-600';
      case 'MEDIUM': return 'text-orange-500';
      case 'HIGH': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getDueDateColor = (date) => {
    if (date === 'OVERDUE') return 'text-red-600 bg-red-50 border border-red-200';
    return 'text-slate-600 bg-slate-50 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e293b] rounded-full flex items-center justify-center text-white font-bold">VS</div>
          <div>
            <h1 className="text-xl font-extrabold text-[#1e293b]">Projects & Tasks Planner</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="w-4 h-4 inline-block bg-gray-200 rounded"></span> SATURDAY, MAY 9
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
            <Bell size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2">
            <div className="relative w-8 h-8 rounded-full border-4 border-gray-100 border-t-gray-800 flex items-center justify-center text-xs font-bold">
              20%
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-400 text-xs">ORG PROGRESS</p>
              <p className="font-bold text-gray-800 text-sm">1 <span className="font-normal text-gray-500">of 5 done</span></p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1e293b]">Projects & Tasks</h2>
            <p className="text-gray-500 text-sm mt-1">Organize work down to the checklist level.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm">
              <Filter size={16} /> Filter
            </button>
            <div className="flex items-center p-1 bg-gray-100 rounded-lg">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm rounded-md text-[#4f46e5] font-semibold text-sm">
                <LayoutList size={16} /> List
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 text-gray-500 font-medium text-sm hover:text-gray-700">
                <Kanban size={16} /> Kanban
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-[#4f46e5] rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <FolderPlus size={16} /> New Project
            </button>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-lg font-semibold text-sm transition-colors shadow-md"
            >
              <Plus size={18} /> New Task
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#f8fafc] text-xs uppercase font-bold text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Task Name</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Assignee</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Due Date</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Priority</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Type</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-[#4f46e5] flex items-center gap-1 cursor-pointer hover:underline"><Plus size={14}/> Add Property</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <React.Fragment key={project}>
                    {/* Project Row */}
                    <tr className="bg-[#f8fafc] group hover:bg-gray-50">
                      <td colSpan="8" className="px-6 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <Folder size={16} className="text-gray-400" />
                          <span className="font-bold text-[#1e293b]">{project}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-600 ml-2">App</span>
                        </div>
                      </td>
                    </tr>
                    {/* Task Rows */}
                    {tasksByProject[project]?.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <ChevronRight size={16} className="text-gray-400" />
                          <span className="font-semibold text-gray-800">{task.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase ${getStatusColor(task.status)}`}>
                            {task.status} <ChevronDown size={12} />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${task.assignee.color}`}>
                              {task.assignee.initials}
                            </div>
                            <span className="font-medium text-gray-700">{task.assignee.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase ${getDueDateColor(task.dueDate)}`}>
                            {task.dueDate}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-xs uppercase tracking-wide">
                          <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-400 text-xs tracking-wide uppercase">
                          {task.type}
                        </td>
                        <td className="px-6 py-4 text-center">
                           <span className="text-gray-300 hover:text-[#4f46e5] cursor-pointer inline-flex justify-center w-full transition-colors"><Plus size={16}/></span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenModal(task)} className="text-gray-400 hover:text-blue-600 transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(task.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          task={editingTask} 
          projects={projects}
          assignees={assignees}
        />
      )}
    </div>
  );
}

// Minimal TaskModal component within the same file for ease, or separate
function TaskModal({ isOpen, onClose, task, projects, assignees }) {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: task?.name || '',
    project: task?.project || projects[0],
    assignee: task?.assignee?.name || assignees[0].name,
    dueDate: task?.dueDate || 'Today',
    priority: task?.priority || 'Medium',
    type: task?.type || 'COMMUNICATION',
    status: task?.status || 'NOT STARTED'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Task title is required');
      return;
    }

    const selectedAssignee = assignees.find(a => a.name === formData.assignee) || assignees[0];

    const taskData = {
      id: task ? task.id : Date.now().toString(),
      ...formData,
      assignee: selectedAssignee
    };

    if (task) {
      dispatch(updateTask(taskData));
      toast.success('Task updated successfully');
    } else {
      dispatch(addTask(taskData));
      toast.success('Task created successfully');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#1e293b]">
            {task ? 'Edit Task' : 'Create Task'}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Task Title *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#4f46e5]/20 focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 outline-none transition-all font-medium text-gray-800"
              placeholder="e.g. Design homepage hero section"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Project Assignment</label>
              <div className="relative">
                <select 
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 outline-none appearance-none font-medium text-gray-700 bg-white cursor-pointer transition-all"
                >
                  {projects.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Assignee</label>
              <div className="relative">
                <select 
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 outline-none appearance-none font-medium text-gray-700 bg-white cursor-pointer transition-all"
                >
                  {assignees.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Due Date</label>
              <div className="relative">
                <select 
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 outline-none appearance-none font-medium text-gray-700 bg-white cursor-pointer transition-all"
                >
                  <option value="TODAY">Today</option>
                  <option value="TOMORROW">Tomorrow</option>
                  <option value="THIS WEEK">This Week</option>
                  <option value="NEXT WEEK">Next Week</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Priority</label>
              <div className="relative">
                <select 
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 outline-none appearance-none font-medium text-gray-700 bg-white cursor-pointer transition-all"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Task Type</label>
              <div className="relative">
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10 outline-none appearance-none font-medium text-gray-700 bg-white cursor-pointer transition-all"
                >
                  <option value="COMMUNICATION">Communication</option>
                  <option value="APPROVAL FOLLOW-UP">Approval Follow-up</option>
                  <option value="CAPTION WRITING">Caption Writing</option>
                  <option value="REEL REVIEW">Reel Review</option>
                  <option value="DEVELOPMENT">Development</option>
                  <option value="DESIGN">Design</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 font-bold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
