import { createAction, createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../api-services/types/types';
import { RootState } from '../../store';

const newTasksList = createAction<ITask[]>('newTasksList');
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
    taskList: [] as ITask[],
    taskModalData: {} as { boardId: string; columnId: string; title: string; description: string },
    currentTask: {} as ITask,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newTasksList, (state, action) => {
      state.taskList = action.payload;
    });
    builder.addCase(taskModalDataAction, (state, action) => {
      state.taskModalData = action.payload;
    });
    builder.addCase(currentTask, (state, action) => {
      state.currentTask = action.payload;
    });
  },
});

export const selectTasksList = (state: RootState) => state.tasks.taskList;
export const selectTaskModalData = (state: RootState) => state.tasks.taskModalData;
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
