import { useEffect, useState } from 'react';
import { TableList } from '../../../components/Table';
import DanhMucService from '../../../utils/services/DanhMucService';
import { DanhMucModal } from './DanhMucModal';
import { useDispatch, useSelector } from 'react-redux';
import { setDanhMucList, setMeta } from '../../../stores/danhmuc.slice';
import { CreateButton, DeleteButton, EditButton } from '../../../components/Button';
import ModalService from '../../../utils/services/ModalService';
import { ConstDanhMuc } from './DanhMuc';
import { Space } from 'antd';
export const DanhMucList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<any[]>([]);
  const dispatch = useDispatch();
  const { danhMucList, meta } = useSelector((state: any) => state.danhmuc);
  useEffect(() => {
    const sub = DanhMucService.refresh$.subscribe((res) => {
      if (res.key === ConstDanhMuc.key) {
        fetchDanhMucList();
      }
    });
    fetchDanhMucList();

    return () => sub.unsubscribe();
  }, [meta]);
  useEffect(() => {
    setColumns([
      {
        title: 'Tên',
        dataIndex: 'ten',
      },
      {
        title: 'Tên',
        dataIndex: 'ten',
      },
      {
        title: 'Đường dẫn',
        dataIndex: 'duong_dan',
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
      },
      {
        title: 'Số thứ tự',
        dataIndex: 'so_thu_tu',
      },
      {
        title: 'Cấp cha',
        dataIndex: 'cap_cha_ten',
      },
      {
        title: 'Loại danh mục',
        dataIndex: 'loai_danh_muc',
        render: (value: boolean) => (value ? 'Danh mục chức năng' : 'Danh mục chung'),
      },
      {
        title: 'Hành động',
        dataIndex: 'action',
        width: '10%',
        align: 'center',
        render: (_: any, record: any) => (
          <div>
            <Space>
              <EditButton
                onClick={async () => {
                  DanhMucService.openUpdateModal(record);
                }}
              />
              <DeleteButton
                onClick={async () => {
                  const confirmed = await ModalService.confirm();
                  if (confirmed) {
                    DanhMucService.delete(record.id).subscribe(
                      () => {
                        ModalService.close();
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
  const fetchDanhMucList = () => {
    setIsLoading(true);
    DanhMucService.getDanhMucList(meta).subscribe(
      (res) => {
        dispatch(setDanhMucList(res.data));
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
      <TableList
        dataSource={danhMucList}
        isLoading={isLoading}
        columns={columns}
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
                DanhMucService.openCreateModal();
              }}
            />
          </>
        }
      />
      <DanhMucModal />
    </>
  );
};
