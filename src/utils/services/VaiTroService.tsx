import type { VaiTroType } from '../../modules/admin/vai-tro/VaiTro';
import { ApiObservable } from '../api/apiObservable';
const url = '/vai-tro';

class VaiTroService extends ApiObservable<VaiTroType> {
  constructor() {
    super(url, 'VaiTroList');
  }
  create(data: VaiTroType) {
    return this.created(data);
  }
  getVaiTroList(params?: any) {
    return this.getMany<VaiTroType[]>(params);
  }
  delete(id: string) {
    return this.del(id);
  }
  update(id: string, data: VaiTroType) {
    return this.updated(id, data);
  }
  getById(id: string) {
    return this.getOne(id);
  }
}
export default new VaiTroService();
