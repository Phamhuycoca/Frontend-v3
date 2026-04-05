import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MetaState } from '../common/interface';
import type { NguoiDungType } from '../modules/admin/nguoi-dung/NguoiDung';
const initialState = {
  meta: {} as MetaState,
  nguoiDungList: [] as NguoiDungType[],
};
const nguoiDungSlice = createSlice({
  name: 'nguoiDung',
  initialState: initialState,
  reducers: {
    setNguoiDungList: (state, action) => {
      state.nguoiDungList = action.payload;
    },
    setMeta(state, action: PayloadAction<Partial<MetaState>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
  },
});
export const { setNguoiDungList, setMeta } = nguoiDungSlice.actions;
export default nguoiDungSlice.reducer;
