import type { TypeRouter } from '../common/interface';
import { DanhMucList } from '../modules/admin/danh-muc/DanhMucList';

const Routers: TypeRouter[] = [
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/danh-muc',
    element: <DanhMucList />,
  },
];
export { Routers };
