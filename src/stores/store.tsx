import { configureStore } from '@reduxjs/toolkit';
import danhMucSlice from './danhmuc.slice';
import nguoiDungSlice from './nguoidung.slice';
export const store = configureStore({
  reducer: {
    danhmuc: danhMucSlice,
    nguoidung: nguoiDungSlice,
  },
});

// Tạo type RootState và AppDispatch để dùng trong app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
