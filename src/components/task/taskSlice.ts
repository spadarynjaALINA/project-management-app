import { createAction, createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../api-services/types/types';
import { RootState } from '../../store';

const taskModalDataAction = createAction<{
  boardId: string;
  columnId: string;
  title: string;
  description: string;
}>('taskModalDataAction');
const currentTask = createAction<ITask>('currentTask');

export const tasks = createSlice({
  name: 'tasks',
  initialState: {
    taskModalData: {} as { boardId: string; columnId: string; title: string; description: string },
    currentTask: {} as ITask,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(taskModalDataAction, (state, action) => {
      state.taskModalData = action.payload;
    });
    builder.addCase(currentTask, (state, action) => {
      state.currentTask = action.payload;
    });
  },
});

export const selectTaskModalData = (state: RootState) => state.tasks.taskModalData;
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
