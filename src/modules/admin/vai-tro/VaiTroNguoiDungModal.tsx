import { Col, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import VaiTroService from '../../../utils/services/VaiTroService';
import { CloseButton } from '../../../components/Button';
import { TableList } from '../../../components/Table';
import NguoiDungSevice from '../../../utils/services/NguoiDungSevice';
import type { NguoiDungType } from '../nguoi-dung/NguoiDung';
import { type MetaState } from './../../../common/interface';

export const VaiTroNguoiDungModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [listNguoiDung, setListNguoiDung] = useState<NguoiDungType[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const [meta, setMeta] = useState<MetaState>({
    filter: '',
    page: 1,
    page_size: 20,
    search: '',
    sort: '',
  });
  useEffect(() => {
    const sub = VaiTroService.baseModal$.subscribe((res) => {
      if (res.open) {
        fetchDanhMucList();
        setIsModalOpen(res.open);
      }
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);
  const fetchDanhMucList = () => {
    NguoiDungSevice.getNguoiDungList(meta).subscribe(
      (res) => {
        setListNguoiDung(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  };
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
    ]);
  }, []);
  return (
    <>
      <Modal
        width={'50%'}
        open={isModalOpen}
        title="Phân vai trò người dùng"
        footer={
          <CloseButton
            onClick={() => {
              console.log('resssss');
              setIsModalOpen(false);
            }}
          />
        }
      >
        <Row>
          <Col span={24}>
            <TableList
              dataSource={listNguoiDung}
              isSearch
              columns={columns}
              page={meta.page}
              total={listNguoiDung.length}
              page_size={meta.page_size}
              onChange={({ page, pageSize, sort, filters, search }) => {
                setMeta({
                  page: page ?? 1,
                  page_size: pageSize ?? 20,
                  filter: filters ? JSON.stringify(filters) : '',
                  search: search || '',
                  sort: sort || '',
                });
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
