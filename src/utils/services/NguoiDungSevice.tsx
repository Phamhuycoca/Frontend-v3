import type { NguoiDungType } from '../../modules/admin/nguoi-dung/NguoiDung';
import { ApiObservable } from '../api/apiObservable';
const url = '/nguoi-dung';

class NguoiDungService extends ApiObservable<NguoiDungType> {
  constructor() {
    super(url, 'NguoiDungList');
  }
  create(data: NguoiDungType) {
    return this.created(data);
  }
  getNguoiDungList(params?: any) {
    return this.getMany<NguoiDungType[]>(params);
  }
  delete(id: string) {
    return this.del(id);
  }
  update(id: string, data: NguoiDungType) {
    return this.updated(id, data);
  }
  getById(id: string) {
    return this.getOne(id);
  }
}
export default new NguoiDungService();
