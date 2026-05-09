import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: '1',
      name: 'test',
      project: 'Summer Menu Launch',
      status: 'NOT STARTED',
      assignee: { name: 'Preethi', initials: 'PR', color: 'bg-purple-500' },
      dueDate: 'TOMORROW',
      priority: 'LOW',
      type: 'COMMUNICATION'
    },
    {
      id: '2',
      name: 'Follow up for Menu Approvals',
      project: 'Summer Menu Launch',
      status: 'WAITING FOR APPROVAL',
      assignee: { name: 'Bakya', initials: 'BK', color: 'bg-blue-500' },
      dueDate: 'OVERDUE',
      priority: 'HIGH',
      type: 'APPROVAL FOLLOW-UP'
    },
    {
      id: '3',
      name: 'Draft Q3 Launch Captions',
      project: 'Q3 Webinar Promo',
      status: 'IN PROGRESS',
      assignee: { name: 'Arun', initials: 'AR', color: 'bg-blue-600' },
      dueDate: 'TODAY',
      priority: 'HIGH',
      type: 'CAPTION WRITING'
    },
    {
      id: '4',
      name: 'Review Downtown Penthouse Video',
      project: 'Downtown Penthouse',
      status: 'SUBMITTED FOR REVIEW',
      assignee: { name: 'Vishnu', initials: 'VN', color: 'bg-green-500' },
      dueDate: 'TOMORROW',
      priority: 'MEDIUM',
      type: 'REEL REVIEW'
    }
  ],
  projects: ['Summer Menu Launch', 'Q3 Webinar Promo', 'Downtown Penthouse'],
  assignees: [
    { name: 'Preethi', initials: 'PR', color: 'bg-purple-500' },
    { name: 'Bakya', initials: 'BK', color: 'bg-blue-500' },
    { name: 'Arun', initials: 'AR', color: 'bg-blue-600' },
    { name: 'Vishnu', initials: 'VN', color: 'bg-green-500' },
    { name: 'Vasanth', initials: 'VS', color: 'bg-orange-500' },
  ],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
