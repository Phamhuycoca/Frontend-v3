import type { QuyenTruyCapType } from '../../modules/admin/quyen-truy-cap/QuyenTruyCap';
import { ApiObservable } from '../api/apiObservable';
const url = '/quyen-truy-cap';

class QuyenTruyCapService extends ApiObservable<QuyenTruyCapType> {
  constructor() {
    super(url, 'QuyenTruyCapList');
  }
  create(data: QuyenTruyCapType) {
    return this.created(data);
  }
  getQuyenTruyCapList(params?: any) {
    return this.getMany<QuyenTruyCapType[]>(params);
  }
  delete(id: string) {
    return this.del(id);
  }
  update(id: string, data: QuyenTruyCapType) {
    return this.updated(id, data);
  }
  getById(id: string) {
    return this.getOne(id);
  }
}
export default new QuyenTruyCapService();
