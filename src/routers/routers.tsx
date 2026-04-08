import type { TypeRouter } from '../common/interface';
import AdminLayout from '../layouts/Admin/AdminLayout';
import { DangNhap } from '../layouts/Auth/DangNhap';
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
  {
    path: '/dang-nhap',
    element: <DangNhap />,
  },
];
export { Routers };
