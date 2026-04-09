import type { TypeRouter } from '../common/interface';
import AdminLayout from '../layouts/Admin/AdminLayout';
import { DangNhap } from '../layouts/Auth/DangNhap';
import { DanhMucList } from '../modules/admin/danh-muc/DanhMucList';
import { NguoiDungList } from '../modules/admin/nguoi-dung/NguoiDungList';
import { VaiTroList } from '../modules/admin/vai-tro/VaiTroList';
import { VaiTroModule } from '../modules/admin/vai-tro/VaiTroModule';

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
      {
        path: '/vai-tro/*',
        element: <VaiTroModule />,
      },
      {
        path: '/quyen-truy-cap',
        element: <VaiTroModule />,
      },
    ],
  },
  {
    path: '/dang-nhap',
    element: <DangNhap />,
  },
];
export { Routers };
