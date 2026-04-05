import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DanhMucType } from '../modules/admin/danh-muc/DanhMuc';
import type { MetaState } from '../common/interface';
const initialState = {
  meta: {} as MetaState,
  danhMucList: [] as DanhMucType[],
};
const danhMucSlice = createSlice({
  name: 'danhMuc',
  initialState: initialState,
  reducers: {
    setDanhMucList: (state, action) => {
      state.danhMucList = action.payload;
    },
    setMeta(state, action: PayloadAction<Partial<MetaState>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
  },
});
export const { setDanhMucList, setMeta } = danhMucSlice.actions;
export default danhMucSlice.reducer;
