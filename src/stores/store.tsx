import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

// Tạo type RootState và AppDispatch để dùng trong app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
