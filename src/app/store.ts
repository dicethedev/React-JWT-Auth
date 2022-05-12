import { configureStore } from '@reduxjs/toolkit';
import {authAPI} from '../services/authAPI';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
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
