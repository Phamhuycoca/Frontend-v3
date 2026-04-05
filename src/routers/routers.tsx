import type { TypeRouter } from '../common/interface';
import { DanhMucList } from '../modules/admin/danh-muc/DanhMucList';
import { NguoiDungList } from '../modules/admin/nguoi-dung/NguoiDungList';

const Routers: TypeRouter[] = [
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/danh-muc',
    element: <DanhMucList />,
  },
  {
    path: '/nguoi-dung',
    element: <NguoiDungList />,
  },
];
export { Routers };
