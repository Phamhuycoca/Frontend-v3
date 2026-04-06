import type { TypeRouter } from '../common/interface';
import AdminLayout from '../layouts/Admin/AdminLayout';
import { DanhMucList } from '../modules/admin/danh-muc/DanhMucList';
import { NguoiDungList } from '../modules/admin/nguoi-dung/NguoiDungList';

const Routers: TypeRouter[] = [
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/danh-muc',
        element: <DanhMucList />,
      },
      {
        path: '/nguoi-dung',
        element: <NguoiDungList />,
      },
    ],
  },
];
export { Routers };
