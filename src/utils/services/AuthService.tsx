import { setTokens } from '../../common/LocalStore';
import { ApiObservable } from '../api/apiObservable';
export type DangNhapType = {
  ten_dang_nhap: string;
  mat_khau: string;
};
export type DangNhapRespone = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
class AuthService extends ApiObservable<DangNhapRespone> {
  constructor() {
    super('', '');
  }
  DangNhap(data: DangNhapType) {
    return this.postByUrl<DangNhapRespone>('auth/dang-nhap', data).subscribe((res) => {
      if (res.access_token && res.refresh_token) {
        setTokens(res.access_token, res.refresh_token);
        return true;
      }
    });
  }
}
export default new AuthService();
