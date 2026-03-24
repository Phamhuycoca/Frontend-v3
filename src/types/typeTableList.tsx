export interface TableListPage {
  page: number;
  page_size: number;
}

export const DEFAULT_PAGE: TableListPage = {
  page: 1,
  page_size: 20,
};
