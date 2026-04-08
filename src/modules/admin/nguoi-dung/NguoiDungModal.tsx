import { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import type { NguoiDungType } from './NguoiDung';
import NguoiDungSevice from '../../../utils/services/NguoiDungSevice';
import { CloseButton, SaveButton } from '../../../components/Button';

export const NguoiDungModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'create' | 'update' | 'delete' | 'view' | 'close'>('close');
  const [data, setData] = useState<NguoiDungType>();
  const [form] = Form.useForm();
  useEffect(() => {
    const sub = NguoiDungSevice.modal$.subscribe((modal) => {
      setIsModalOpen(modal.open);
      setMode(modal.mode);
      if (modal.mode === 'update' && modal.record) {
        setData(modal.record);
        form.setFieldsValue(modal.record);
      } else {
        form.resetFields();
      }
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);
  const submit = (values: NguoiDungType) => {
    if (mode === 'update') {
      values.ten_day_du = values.ho + ' ' + values.ten;
      const res = { ...data, ...values };
      NguoiDungSevice.update(res.id, res).subscribe((res) => {
        if (res) {
          form.resetFields();
          NguoiDungSevice.closeModal();
        }
      });
    } else {
      values.ten_day_du = values.ho + ' ' + values.ten;
      NguoiDungSevice.create(values).subscribe((res) => {
        if (res) {
          form.resetFields();
          NguoiDungSevice.closeModal();
        }
      });
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Người dùng"
        footer={
          <>
            <SaveButton onClick={() => form.submit()} />
            <CloseButton
              onClick={() => {
                NguoiDungSevice.closeModal();
              }}
            />
          </>
        }
      >
        <Form
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          form={form}
          onFinish={submit}
        >
          <Form.Item label="Họ" name="ho">
            <Input />
          </Form.Item>
          <Form.Item label="Tên" name="ten">
            <Input />
          </Form.Item>
          <Form.Item label="Icon" name="icon">
            <Input />
          </Form.Item>
          <Form.Item label="Tên đăng nhập" name="ten_dang_nhap">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
