import { BehaviorSubject, Subject, from, map, Observable, catchError, throwError } from 'rxjs';

import apiClient from './apiClient';
import type { PagedResponse, refreshList, ResponseData, typeModal } from '../../common/interface';
import AlertService from '../services/AlertService';

export class ApiObservable<T> {
  protected url: string;
  protected key: string;

  private modalSubject = new BehaviorSubject<typeModal<T>>({
    open: false,
    mode: 'create',
  });

  private refreshSubject = new Subject<refreshList>();

  constructor(url: string, key: string) {
    this.url = url;
    this.key = key;
  }

  // ================= COMMON ERROR HANDLER =================
  private handleError(err: any, action: string) {
    const msg = err?.response?.data?.Message ?? err?.response?.data?.message ?? 'Có lỗi xảy ra';
    AlertService.error(msg);
    console.error(`Error ${action}:`, err);
    return throwError(() => err);
  }
  // ================= URL DYNAMIC METHODS =================

  getByUrl<R = any>(url: string, params?: any): Observable<R> {
    return from(apiClient.get<R>(url, { params })).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err, 'fetching data')),
    );
  }

  postByUrl<R = any, D = any>(url: string, data?: D): Observable<R> {
    return from(apiClient.post<R>(url, data)).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err, 'posting data')),
    );
  }

  putByUrl<R = any, D = any>(url: string, data?: D): Observable<R> {
    return from(apiClient.put<R>(url, data)).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err, 'updating data')),
    );
  }

  deleteByUrl<R = any>(url: string): Observable<R> {
    return from(apiClient.delete<R>(url)).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err, 'deleting data')),
    );
  }

  // ================= GET MANY =================
  getMany<R>(params?: any): Observable<PagedResponse<R>> {
    return from(apiClient.get<PagedResponse<R>>(this.url, { params })).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err, 'fetching list')),
    );
  }

  // ================= GET ONE =================
  getOne<R>(id: string): Observable<ResponseData<R>> {
    return from(apiClient.get<ResponseData<R>>(`${this.url}/${id}`)).pipe(
      map((res) => {
        const message = res.data.message || 'Lấy thông tin thành công';
        if (res.data.data) {
          AlertService.success(message);
        }
        return res.data;
      }),
      catchError((err) => this.handleError(err, 'fetching detail')),
    );
  }

  // ================= CREATE =================
  created<R>(data: R): Observable<ResponseData<R>> {
    return from(apiClient.post<ResponseData<R>>(this.url, data)).pipe(
      map((res) => {
        AlertService.success(res.data.message || 'Thêm mới thành công');
        this.refreshList('create', this.key);
        return res.data;
      }),
      catchError((err) => this.handleError(err, 'creating')),
    );
  }

  // ================= UPDATE =================
  updated<R>(id: string, data: any): Observable<ResponseData<R>> {
    return from(apiClient.put<ResponseData<R>>(`${this.url}/${id}`, data)).pipe(
      map((res) => {
        AlertService.success(res.data.message || 'Cập nhật thành công');
        this.refreshList('update', this.key); // auto refresh
        return res.data;
      }),
      catchError((err) => this.handleError(err, 'updating')),
    );
  }

  // ================= DELETE =================
  del<R>(id: string): Observable<R> {
    return from(apiClient.delete<{ data: R }>(`${this.url}/${id}`)).pipe(
      map((res) => {
        AlertService.success('Xóa thành công');

        this.refreshList('delete', this.key); // auto refresh

        return res.data.data;
      }),
      catchError((err) => this.handleError(err, 'deleting')),
    );
  }

  // ================= OBSERVABLE =================
  modal$ = this.modalSubject.asObservable();
  refresh$ = this.refreshSubject.asObservable();

  // ================= MODAL =================
  openCreateModal() {
    this.modalSubject.next({
      open: true,
      mode: 'create',
    });
  }

  openUpdateModal(record: T) {
    this.modalSubject.next({
      open: true,
      mode: 'update',
      record,
    });
  }

  closeModal() {
    this.modalSubject.next({
      open: false,
      mode: 'close',
    });
  }

  // ================= REFRESH =================
  refreshList(mode: 'create' | 'update' | 'delete' = 'create', key: string) {
    this.refreshSubject.next({ mode, key });
  }
}
