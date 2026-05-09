import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// Fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/tasks');
    return response.data.data || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Add a task
export const addTask = createAsyncThunk('tasks/addTask', async (taskData, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/tasks', taskData);
    return response.data.data || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, ...taskData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/tasks/${id}`, taskData);
    return response.data.data || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/tasks/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadState(),
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        saveState(state.tasks);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Keep using localStorage tasks on fail
      })
      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        saveState(state.tasks);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id || task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          saveState(state.tasks);
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload && task.id !== action.payload);
        saveState(state.tasks);
      });
  },
});

export default taskSlice.reducer;
