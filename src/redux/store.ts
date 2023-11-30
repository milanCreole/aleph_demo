import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import locationReducer from './locations';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
