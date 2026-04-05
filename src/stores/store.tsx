import { configureStore } from '@reduxjs/toolkit';
import danhMucSlice from './danhmuc.slice';
export const store = configureStore({
  reducer: {
    danhmuc: danhMucSlice,
  },
});

// Tạo type RootState và AppDispatch để dùng trong app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
