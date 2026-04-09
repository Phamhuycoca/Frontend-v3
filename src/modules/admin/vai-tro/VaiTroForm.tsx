import { useNavigate, useParams } from 'react-router-dom';
import { CloseButton, SaveButton } from '../../../components/Button';
import { Form, Input, Row, Space, Spin } from 'antd';
import type { VaiTroType } from './VaiTro';
import VaiTroService from '../../../utils/services/VaiTroService';
import { useEffect, useState } from 'react';

export const VaiTroForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFinish = (values: VaiTroType) => {
    if (id && id !== 'new') {
      setIsLoading(true);
      const data = { ...values, id };
      VaiTroService.update(id, data).subscribe(
        (res) => {
          if (res) {
            form.resetFields();
            setIsLoading(false);
            navigate('..');
          }
        },
        (err) => {
          console.log(err);
          setIsLoading(false);
        },
      );
    } else {
      setIsLoading(true);
      VaiTroService.create(values).subscribe(
        (res) => {
          if (res) {
            form.resetFields();
            setIsLoading(false);
            navigate('..');
          }
        },
        (err) => {
          console.log(err);
          setIsLoading(false);
        },
      );
    }
  };
  useEffect(() => {
    if (id && id !== 'new') {
      setIsLoading(true);
      VaiTroService.getById(id).subscribe(
        (res) => {
          form.setFieldsValue(res.data);
          setIsLoading(false);
        },
        (err) => {
          console.log(err);
          setIsLoading(false);
        },
      );
    } else {
      console.log('new');
    }
  }, [id]);
  return (
    <>
      <Spin spinning={isLoading}>
        <Row justify={'end'}>
          <Space>
            <SaveButton
              onClick={() => {
                form.submit();
              }}
            />
            <CloseButton
              onClick={() => {
                navigate('..');
              }}
            />
          </Space>
        </Row>
        <Form form={form} onFinish={onFinish} className="mt-4">
          <Form.Item name={'ma'} label="Mã">
            <Input />
          </Form.Item>
          <Form.Item name={'ten'} label="Tên">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
