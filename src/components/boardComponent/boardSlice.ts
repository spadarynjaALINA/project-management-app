import { createAction, createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces/interfaces';
import { RootState } from '../../store';

const newBoardList = createAction<Record<string, never>[]>('newBoardList');
const isBoardModalAction = createAction<boolean>('isBoardModalAction');
const boardModalDataAction = createAction<IBoard>('boardModalDataAction');

export const boards = createSlice({
  name: 'boards',
  initialState: {
    boardsList: [] as Record<string, never>[],
    isBoardModal: false,
    boardModalData: {} as IBoard,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newBoardList, (state, action) => {
      state.boardsList = action.payload;
    });
    builder.addCase(isBoardModalAction, (state, action) => {
      state.isBoardModal = action.payload;
    });
    builder.addCase(boardModalDataAction, (state, action) => {
      state.boardModalData = action.payload;
    });
  },
});
export const selectBoardList = (state: RootState) => state.boards.boardsList;
export const selectIsBoardModal = (state: RootState) => state.boards.isBoardModal;
export const selectBoardModalData = (state: RootState) => state.boards.boardsList;
