import { Breadcrumb, Col, Row } from 'antd';
import { TableList } from '../../../components/Table';
import { setMeta, setQuyenTruyCapList } from '../../../stores/quyentruycap.slice';
import { CreateButton } from '../../../components/Button';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import QuyenTruyCapService from '../../../utils/services/QuyenTruyCapService';

export const QuyenTruyCapList = () => {
  const navigate = useNavigate();
  const [colums, setColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { quyenTryCapList, meta } = useSelector((state: any) => state.quyentruycap);
  useEffect(() => {
    const sub = QuyenTruyCapService.refresh$.subscribe((res) => {
      if (res.key === 'QuyenTruyCapList') {
        fetchList();
      }
    });
    fetchList();
    setColumns([
      {
        title: 'Mã',
        dataIndex: 'ma',
        render: (_: any, record: any) => <Link to={`${record.id}`}>{record.ma}</Link>,
      },
      {
        title: 'Tên',
        dataIndex: 'ten',
      },
    ]);
    return () => sub.unsubscribe();
  }, [meta]);
  const fetchList = () => {
    setIsLoading(true);
    QuyenTruyCapService.getQuyenTruyCapList(meta).subscribe(
      (res) => {
        dispatch(setQuyenTruyCapList(res.data));
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      },
    );
  };
  return (
    <>
      <Breadcrumb
        items={[{ title: 'Trang chủ' }, { title: 'Quản lý quyền truy cập' }]}
        className="mb-3"
      />
      <Row gutter={16}>
        <Col md={12}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <TableList
                dataSource={quyenTryCapList}
                isLoading={isLoading}
                columns={colums}
                isSearch={true}
                page={meta.page}
                total={meta.total}
                page_size={meta.page_size}
                onChange={({ page, pageSize, sort, filters, search }) => {
                  dispatch(
                    setMeta({
                      page: page,
                      page_size: pageSize,
                      filter: filters ? JSON.stringify(filters) : '',
                      search: search || '',
                      sort: sort || '',
                    }),
                  );
                }}
                acctionButton={
                  <>
                    <CreateButton
                      onClick={() => {
                        navigate('/quyen-truy-cap/new');
                      }}
                    />
                  </>
                }
              />
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};
