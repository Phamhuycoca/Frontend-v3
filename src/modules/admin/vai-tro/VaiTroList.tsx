import { TableList } from '../../../components/Table';
import { CreateButton, DeleteButton, EditButton } from '../../../components/Button';
import { Col, Row, Space } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VaiTroService from '../../../utils/services/VaiTroService';
import { useDispatch, useSelector } from 'react-redux';
import { setMeta, setVaiTroList } from '../../../stores/vaitro.slice';
import ModalService from '../../../utils/services/ModalService';

export const VaiTroList = () => {
  const navigate = useNavigate();
  const [colums, setColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { vaiTroList, meta } = useSelector((state: any) => state.vaitro);
  useEffect(() => {
    const sub = VaiTroService.refresh$.subscribe((res) => {
      if (res.key === 'VaiTroList') {
        fetchList(2);
      }
    });

    fetchList(1);

    return () => sub.unsubscribe();
  }, [meta]);
  useEffect(() => {
    setColumns([
      {
        title: 'Mã',
        dataIndex: 'ma',
      },
      {
        title: 'Tên',
        dataIndex: 'ten',
      },
      {
        title: 'Hành động',
        dataIndex: 'action',
        width: '50px',
        render: (_: any, record: any) => (
          <div>
            <Space>
              <EditButton
                onClick={async () => {
                  navigate(`${record.id}`);
                }}
              />
              <DeleteButton
                onClick={async () => {
                  const confirmed = await ModalService.confirm();
                  if (confirmed) {
                    VaiTroService.delete(record.id).subscribe(
                      () => {
                        ModalService.close();
                        fetchList(3);
                      },
                      (error) => {
                        console.error(error);
                        ModalService.close();
                      },
                    );
                  }
                }}
              />
            </Space>
          </div>
        ),
      },
    ]);
  }, []);
  const fetchList = (i: any) => {
    console.log('iiiiiiiiiiiiiiii', i);

    setIsLoading(true);
    VaiTroService.getVaiTroList().subscribe(
      (res) => {
        dispatch(setVaiTroList(res.data));
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
      <Row gutter={16}>
        <Col md={12}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <TableList
                dataSource={vaiTroList}
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
                        navigate('/vai-tro/new');
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
