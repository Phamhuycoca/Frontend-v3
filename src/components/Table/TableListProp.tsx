import type { TableProps } from 'antd';

export type TableListProp<T> = TableProps<T> & {
  title?: string;
  page?: number;
  page_size?: number;
  sort?: string;
  filters?: string;
  search?: string;
  isLoading?: boolean;
  isSearch?: boolean;
  total?: number;
  acctionButton?: React.ReactNode;
  onChange?: (params: {
    page: number;
    pageSize: number;
    sort?: string;
    filters?: Record<string, any>;
    search?: string;
  }) => void;
};
