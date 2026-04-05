export interface typeModal<T> {
  open: boolean;
  mode: 'create' | 'update' | 'delete' | 'view' | 'close';
  record?: T;
}
export interface refreshList {
  key: string;
  mode: 'create' | 'update' | 'delete';
}
export interface PaginationMeta {
  page: number;
  page_size: number;
  ranger: {
    from: number;
    to: number;
  };
  total: number;
  total_page: number;
}

export interface PagedResponse<T> {
  meta: PaginationMeta;
  data: T;
}
export interface ResponseData<T> {
  statusCode: number;
  data: T;
  success: boolean;
  message: string;
}
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
export interface TypeRouter {
  path: string;
  element: React.ReactNode;
  private?: boolean | false;
  permission?: string[];
  children?: TypeRouter[];
}
export interface MetaState {
  page: number;
  page_size: number;
  search: string;
  sort: string;
  filter: string;
}
export type ItemTreeSelect = {
  id: string;
  ten: string;
  childrens: ItemTreeSelect[];
};
export interface ItemSelect {
  id: string;
  ten: string;
}
