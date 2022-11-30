import { createAction, createSlice } from '@reduxjs/toolkit';
import { IColumn } from '../../api-services/types/types';
import { RootState } from '../../store';

const newColumnsList = createAction<IColumn[]>('newColumnsList');
const currentColumnId = createAction<string>('currentColumnId');
const columnModalDataAction = createAction<{ boardId: string; title: string }>(
  'columnModalDataAction'
);
export const columns = createSlice({
  name: 'columns',
  initialState: {
    columnId: '',
    columnList: [] as IColumn[],
    columnModalData: {} as { boardId: string; title: string },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newColumnsList, (state, action) => {
      state.columnList = action.payload;
    });
    builder.addCase(columnModalDataAction, (state, action) => {
      state.columnModalData = action.payload;
    });
    builder.addCase(currentColumnId, (state, action) => {
      state.columnId = action.payload;
    });
  },
});
export const selectColumnsList = (state: RootState) => state.columns.columnList;
export const selectColumnModalData = (state: RootState) => state.columns.columnModalData;
export const selectCurrentColumnId = (state: RootState) => state.columns.columnId;
