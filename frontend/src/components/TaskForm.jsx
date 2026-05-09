import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, fetchTasks } from '../redux/taskSlice';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';

const TaskForm = ({ isOpen, onClose, taskToEdit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    project: 'Summer Menu Launch',
    assignee: 'Vasanth',
    dueDate: '',
    priority: 'Medium',
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        project: taskToEdit.project || 'Summer Menu Launch',
        assignee: taskToEdit.assignee || 'Vasanth',
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '',
        priority: taskToEdit.priority || 'Medium',
      });
    } else {
      setFormData({
        title: '',
        project: 'Summer Menu Launch',
        assignee: 'Vasanth',
        dueDate: '',
        priority: 'Medium',
      });
    }
  }, [taskToEdit, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('Task title is required');
      return;
    }

    try {
      if (taskToEdit) {
        await dispatch(updateTask({ id: taskToEdit._id || taskToEdit.id, ...formData })).unwrap();
        toast.success('Task updated successfully!');
        dispatch(fetchTasks());
      } else {
        await dispatch(addTask(formData)).unwrap();
        toast.success('Task created successfully!');
        dispatch(fetchTasks());
      }
      onClose();
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-card w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          {taskToEdit ? 'Edit Task' : 'Create Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900 dark:text-gray-100"
              placeholder="Enter task title"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
                Project Assignment
              </label>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900 dark:text-gray-100"
              >
                <option value="Summer Menu Launch">Summer Menu Launch</option>
                <option value="Winter Campaign">Winter Campaign</option>
                <option value="Website Redesign">Website Redesign</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
                Assignee
              </label>
              <select
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900 dark:text-gray-100"
              >
                <option value="Vasanth">Vasanth</option>
                <option value="Priya">Priya</option>
                <option value="Rahul">Rahul</option>
                <option value="Anita">Anita</option>
                <option value="sanjay">sanjay</option>
                <option value="deepak">deepak</option>
                <option value="kavin">kavin</option>
                <option value="kavya">kavya</option>
                <option value="priyansh">priyansh</option>
                <option value="rohit">rohit</option>
                <option value="prakash">prakash</option>
                <option value="ashwin">ashwin</option>
                <option value="ashok">ashok</option>
                <option value="siva">siva</option>
                <option value="ashish">ashish</option>
                <option value="manikandan">manikandan</option>
                <option value="ramkumar">ramkumar</option> 
                <option value="vignesh">vignesh</option>
                <option value="kishore">kishore</option>
                <option value="arun">arun</option>






              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900 dark:text-gray-100"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-medium text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all transform active:scale-95"
            >
              {taskToEdit ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
