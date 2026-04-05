import { ApiObservable } from '../api/apiObservable';
import { ConstDanhMuc, type DanhMucType } from '../../modules/admin/danh-muc/DanhMuc';
const url = '/danh-muc';

class DanhMucService extends ApiObservable<DanhMucType> {
  constructor() {
    super(url, ConstDanhMuc.key);
  }
  getDanhMucList(params?: any) {
    return this.getMany<DanhMucType[]>(params);
  }
  create(data: DanhMucType) {
    return this.created(data);
  }
  delete(id: string) {
    return this.del(id);
  }
  update(id: string, data: DanhMucType) {
    return this.updated(id, data);
  }
  getById(id: string) {
    return this.getOne(id);
  }
}
export default new DanhMucService();
