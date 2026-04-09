import { Form, Input, Row, Space, Spin, TreeSelect } from 'antd';
import { CloseButton, DeleteButton, EditButton, SaveButton } from '../../../components/Button';
import ModalService from '../../../utils/services/ModalService';
import QuyenTruyCapService from '../../../utils/services/QuyenTruyCapService';
import { useEffect, useState } from 'react';
import type { QuyenTruyCapType } from './QuyenTruyCap';
import { useNavigate, useParams } from 'react-router-dom';
import DanhMucService from '../../../utils/services/DanhMucService';
import { MetaStateDefaut } from './../../../common/interface';
import { ConvertTreeSelect } from '../../../utils/helpers/Convert';

export const QuyenTruyCapForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [danhMucList, setDanhMucList] = useState<any>([]);

  const onFinish = (values: QuyenTruyCapType) => {
    if (id && id !== 'new') {
      setIsLoading(true);
      const data = { ...values, id };
      QuyenTruyCapService.update(id, data).subscribe(
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
      QuyenTruyCapService.create(values).subscribe(
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
    fetchDanhMuc();
    if (id && id !== 'new') {
      setIsLoading(true);
      QuyenTruyCapService.getById(id).subscribe(
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
  const fetchDanhMuc = () => {
    DanhMucService.getDanhMucList(MetaStateDefaut).subscribe(
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
      <Spin spinning={isLoading}>
        <Row justify={'end'}>
          <Space>
            {editMode ? (
              <Space>
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
                        QuyenTruyCapService.delete(id).subscribe(
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
        <Form
          form={form}
          onFinish={onFinish}
          className="mt-4"
          labelAlign="left"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
        >
          <Form.Item name={'ma'} label="Mã">
            <Input disabled={editMode} />
          </Form.Item>
          <Form.Item name={'ten'} label="Tên">
            <Input disabled={editMode} />
          </Form.Item>
          <Form.Item name={'danh_muc_id'} label="Danh mục">
            <TreeSelect
              disabled={editMode}
              allowClear
              treeDefaultExpandAll
              treeData={danhMucList}
              title="Chọn danh mục"
            />
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
