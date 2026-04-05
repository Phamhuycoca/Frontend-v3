import { useEffect, useState } from 'react';
import DanhMucService from '../../../utils/services/DanhMucService';
import { Form, Input, InputNumber, Modal, Radio, TreeSelect } from 'antd';
import type { DanhMucType } from './DanhMuc';
import { ConvertTreeSelect } from '../../../utils/helpers/Convert';

export const DanhMucModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [danhMucList, setDanhMucList] = useState<any[]>([]);
  const [mode, setMode] = useState<'create' | 'update' | 'delete' | 'view' | 'close'>('close');
  const [data, setData] = useState<DanhMucType>();
  const [form] = Form.useForm();
  useEffect(() => {
    const sub = DanhMucService.modal$.subscribe((modal) => {
      setIsModalOpen(modal.open);
      setMode(modal.mode);
      if (modal.open) {
        fetchDanhMucList();
      }
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
  const fetchDanhMucList = () => {
    DanhMucService.getDanhMucList().subscribe(
      (res) => {
        setDanhMucList(ConvertTreeSelect(res.data));
      },
      (error) => {
        console.error(error);
      },
    );
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={() => DanhMucService.closeModal()}
        title="Danh Mục"
        onOk={() => form.submit()}
      >
        <Form
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          form={form}
          onFinish={(values: DanhMucType) => {
            if (mode === 'update') {
              const res = { ...data, ...values };
              DanhMucService.update(res.id, res).subscribe((res) => {
                if (res) {
                  form.resetFields();
                  DanhMucService.closeModal();
                }
              });
            } else {
              DanhMucService.create(values).subscribe((res) => {
                if (res) {
                  form.resetFields();
                  DanhMucService.closeModal();
                }
              });
            }
          }}
        >
          <Form.Item label="Tên danh mục" name="ten">
            <Input />
          </Form.Item>
          <Form.Item label="Đường dẫn" name="duong_dan">
            <Input />
          </Form.Item>
          <Form.Item label="Icon" name="icon">
            <Input />
          </Form.Item>
          <Form.Item label="Số thứ tự" name="so_thu_tu">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Cấp cha" name="cap_cha_id">
            <TreeSelect allowClear treeData={danhMucList} title="Chọn cấp cha" />
          </Form.Item>
          <Form.Item label="Loại danh mục" name="loai_danh_muc">
            <Radio.Group>
              <Radio value={false}>Danh mục chung</Radio>
              <Radio value={true}>Danh mục chức năng</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
