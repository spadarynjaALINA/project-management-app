import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const newColumnList = createAction<Record<string, never>[]>('newColumnList');

export const columns = createSlice({
  name: 'columns',
  initialState: {
    columnList: [] as Record<string, never>[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newColumnList, (state, action) => {
      state.columnList = action.payload;
    });
  },
});
export const selectColumnList = (state: RootState) => state.columns.columnList;
