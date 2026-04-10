import { useNavigate, useParams } from 'react-router-dom';
import {
  CloseButton,
  CommonButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from '../../../components/Button';
import { Form, Input, Row, Space, Spin } from 'antd';
import type { VaiTroType } from './VaiTro';
import VaiTroService from '../../../utils/services/VaiTroService';
import { useEffect, useState } from 'react';
import ModalService from '../../../utils/services/ModalService';
import { VaiTroNguoiDungModal } from './VaiTroNguoiDungModal';

export const VaiTroForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const onFinish = (values: VaiTroType) => {
    if (id && id !== 'new') {
      setIsLoading(true);
      const data = { ...values, id };
      VaiTroService.update(id, data).subscribe(
        (res) => {
          if (res) {
            setEditMode(true);
            setIsLoading(false);
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
            setIsLoading(false);
            setEditMode(true);
            navigate(`../${res.data.id}`);
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
          setEditMode(true);
          setIsLoading(false);
        },
        (err) => {
          console.log(err);
          setIsLoading(false);
        },
      );
    } else {
      form.resetFields();
      setEditMode(false);
    }
  }, [id]);
  return (
    <>
      <Spin spinning={isLoading}>
        <Row justify={'end'}>
          <Space>
            {editMode ? (
              <Space>
                <CommonButton
                  text="Phân quyền"
                  onClick={() => {
                    VaiTroService.baseModal({
                      open: true,
                      mode: 'vai-tro-nguoi-dung',
                      id: id,
                    });
                  }}
                />
                <EditButton
                  onClick={() => {
                    setEditMode(false);
                  }}
                />
                <DeleteButton
                  onClick={async () => {
                    const confirmed = await ModalService.confirm();
                    if (confirmed) {
                      if (id && id !== 'new') {
                        VaiTroService.delete(id).subscribe(
                          () => {
                            if (id !== 'new') {
                              navigate('..');
                            }
                            ModalService.close();
                          },
                          (error) => {
                            console.error(error);
                            ModalService.close();
                          },
                        );
                      }
                    }
                  }}
                />
              </Space>
            ) : (
              <SaveButton
                onClick={() => {
                  form.submit();
                }}
              />
            )}
            <CloseButton
              onClick={() => {
                navigate('..');
              }}
            />
          </Space>
        </Row>
        <Form form={form} onFinish={onFinish} className="mt-4">
          <Form.Item name={'ma'} label="Mã">
            <Input disabled={editMode} />
          </Form.Item>
          <Form.Item name={'ten'} label="Tên">
            <Input disabled={editMode} />
          </Form.Item>
        </Form>
      </Spin>
      <VaiTroNguoiDungModal />
    </>
  );
};
