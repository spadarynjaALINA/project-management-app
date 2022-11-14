import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const signIn = createAction<string>('signIn');

export const signInSlice = createSlice({
  name: 'signIn',
  initialState: {
    name: '' as string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn, (state, action) => {
      state.name = action.payload;
    });
  },
});
export const selectName = (state: RootState) => state.signIn.name;
