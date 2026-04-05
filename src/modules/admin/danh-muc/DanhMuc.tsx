export type DanhMucType = {
  id: string;
  ten: string;
  icon: string;
  mo_ta: string;
  duong_dan: string;
  so_thu_tu: string;
  cap_cha_id: string;
  childrens?: DanhMucType[];
};
export const ConstDanhMuc = {
  key: 'DanhMucList',
};
