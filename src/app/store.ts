import { configureStore } from '@reduxjs/toolkit';
//the Folder is deleted from this project
// import counterReducer from '../features/counter/counterSlice';
import {authAPI} from '../services/authAPI';
import { setupListeners } from '@reduxjs/toolkit/query/react'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    [authAPI.reducerPath]: authAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat(authAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
