export type TableListProp<T> = {
  page?: number;
  page_size?: number;
  search?: string;
  isLoading?: boolean;
  isSearch?: boolean;
  total?: number;
  acctionButton?: React.ReactNode;
  columns?: any[];
  dataSource?: T[];
  arrFilterForm?: FilterForm[];
  sizeFilter?: 6 | 8 | 12 | 24;
  onChange?: (params: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
    search?: string;
  }) => void;
};
interface FilterForm {
  label: string;
  name: string;
  type: 'text' | 'select' | 'date' | 'checkbox' | 'treeselect';
  data?: { label: string; value: any; children?: any[] }[];
}
