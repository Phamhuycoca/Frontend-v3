import { useEffect, useState } from 'react';
import { TableList } from '../../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import NguoiDungSevice from '../../../utils/services/NguoiDungSevice';
import { CreateButton, DeleteButton, EditButton } from '../../../components/Button';
import ModalService from '../../../utils/services/ModalService';
import { setMeta, setNguoiDungList } from '../../../stores/nguoidung.slice';
import { NguoiDungModal } from './NguoiDungModal';

export const NguoiDungList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<any[]>([]);
  const dispatch = useDispatch();
  const { nguoiDungList, meta } = useSelector((state: any) => state.nguoidung);
  useEffect(() => {
    const sub = NguoiDungSevice.refresh$.subscribe((res) => {
      console.log('resssssssssssss', res);

      if (res.key === 'NguoiDungList') {
        fetchDanhMucList();
      }
    });
    fetchDanhMucList();

    return () => sub.unsubscribe();
  }, [meta]);
  useEffect(() => {
    setColumns([
      {
        title: 'Tên đầy đủ',
        dataIndex: 'ten_day_du',
      },
      {
        title: 'Tài khoản',
        dataIndex: 'ten_dang_nhap',
      },
      {
        title: 'Trạng thái tài khoản',
        dataIndex: 'khoa_tai_khoan',
      },
      {
        title: 'Giới tính',
        dataIndex: 'gioi_tinh_id',
      },
      {
        title: 'Hành động',
        dataIndex: 'action',
        render: (_: any, record: any) => (
          <div>
            <DeleteButton
              onClick={async () => {
                const confirmed = await ModalService.confirm();
                if (confirmed) {
                  NguoiDungSevice.delete(record.id).subscribe(
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
            <EditButton
              onClick={async () => {
                NguoiDungSevice.openUpdateModal(record);
              }}
            />
          </div>
        ),
      },
    ]);
  }, []);
  const fetchDanhMucList = () => {
    setIsLoading(true);
    NguoiDungSevice.getNguoiDungList(meta).subscribe(
      (res) => {
        dispatch(setNguoiDungList(res.data));
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
        dataSource={nguoiDungList}
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
                NguoiDungSevice.openCreateModal();
              }}
            />
          </>
        }
      />
      <NguoiDungModal />
    </>
  );
};
