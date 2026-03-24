import { from, map, Observable } from 'rxjs';
import apiClient from './apiClient';

class ApiObservable {
  getMany<T>(url: string, params?: any): Observable<T> {
    return from(apiClient.get<T>(url, { params })).pipe(map((res) => res.data));
  }

  getOne<T>(url: string): Observable<T> {
    return from(apiClient.get<T>(url)).pipe(map((res) => res.data));
  }

  create<T>(url: string, data: any): Observable<T> {
    return from(apiClient.post<T>(url, data)).pipe(map((res) => res.data));
  }

  update<T>(url: string, data: any): Observable<T> {
    return from(apiClient.put<T>(url, data)).pipe(map((res) => res.data));
  }

  delete<T>(url: string): Observable<T> {
    return from(apiClient.delete<T>(url)).pipe(map((res) => res.data));
  }
}

export default new ApiObservable();
