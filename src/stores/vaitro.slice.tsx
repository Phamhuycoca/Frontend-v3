import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MetaState } from '../common/interface';
import type { VaiTroType } from '../modules/admin/vai-tro/VaiTro';
const initialState = {
  meta: {} as MetaState,
  vaiTroList: [] as VaiTroType[],
};
const vaiTroSlice = createSlice({
  name: 'vaiTro',
  initialState: initialState,
  reducers: {
    setVaiTroList: (state, action) => {
      state.vaiTroList = action.payload;
    },
    setMeta(state, action: PayloadAction<Partial<MetaState>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
  },
});
export const { setVaiTroList, setMeta } = vaiTroSlice.actions;
export default vaiTroSlice.reducer;
