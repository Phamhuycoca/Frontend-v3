import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MetaState } from '../common/interface';
import type { QuyenTruyCapType } from '../modules/admin/quyen-truy-cap/QuyenTruyCap';
const initialState = {
  meta: {} as MetaState,
  quyenTryCapList: [] as QuyenTruyCapType[],
};
const quyenTruyCapSlice = createSlice({
  name: 'quyenTruyCap',
  initialState: initialState,
  reducers: {
    setQuyenTruyCapList: (state, action) => {
      state.quyenTryCapList = action.payload;
    },
    setMeta(state, action: PayloadAction<Partial<MetaState>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
  },
});
export const { setQuyenTruyCapList, setMeta } = quyenTruyCapSlice.actions;
export default quyenTruyCapSlice.reducer;
