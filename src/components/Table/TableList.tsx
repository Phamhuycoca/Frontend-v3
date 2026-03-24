import { Col, Input, Row, Space, Spin, Table } from 'antd';
import type { TableListProp } from './TableListProp';
import { useState } from 'react';
import { DEFAULT_PAGE } from './../../types/typeTableList';
const { Search } = Input;
export const TableList = <T,>(props: TableListProp<T>) => {
  const [searchValue, setSearchValue] = useState(props.search || '');
  return (
    <>
      {props.isSearch && (
        <>
          <Row className="mb-4">
            <Col span={12}>
              <Row align={'middle'}>
                <Col span={16}>
                  <Search
                    placeholder="Nhập từ khóa để tìm kiếm"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={(value) => {
                      props.onChange?.({
                        page: props.page ?? DEFAULT_PAGE.page,
                        pageSize: props.page_size ?? DEFAULT_PAGE.page_size,
                        search: value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify={'end'}>
                <Space>{props.acctionButton}</Space>
              </Row>
            </Col>
          </Row>
        </>
      )}
      <Spin spinning={props.isLoading}>
        <Table<T>
          columns={props.columns}
          dataSource={props.dataSource}
          pagination={{
            current: props.page ?? DEFAULT_PAGE.page,
            pageSize: props.page_size ?? DEFAULT_PAGE.page_size,
            total: props.total ?? props.dataSource?.length ?? 0,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
          }}
          rowKey={(record: any) => record.id || JSON.stringify(record)}
          onChange={(pagination, filters, sorter) => {
            let sort: string | undefined = undefined;

            if (!Array.isArray(sorter) && sorter.field && sorter.order) {
              const order = sorter.order === 'ascend' ? 0 : 1;
              sort = `{"${sorter.field}":${order}}`;
            }

            props.onChange?.({
              page: pagination.current || 1,
              pageSize: pagination.pageSize || 20,
              sort,
              filters,
            });
          }}
          {...props}
        />
      </Spin>
    </>
  );
};
