import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { columns } from './features/column/columnSlice';
import { signInSlice } from './features/sign-in/signInSlice';

const rootReducer = combineReducers({
  columns: columns.reducer,
  signIn: signInSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
