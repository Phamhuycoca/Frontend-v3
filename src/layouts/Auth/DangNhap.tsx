import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Image, Input, Row } from 'antd';
import AuthService from '../../utils/services/AuthService';
import { useNavigate } from 'react-router-dom';

export const DangNhap = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const result = AuthService.DangNhap(values);
    if (result) {
      navigate('/nguoi-dung');
    }
    result.unsubscribe();
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
        maxHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 600, width: 360 }}
        onFinish={onFinish}
      >
        <Row justify={'center'} className="mb-2">
          <Image
            height={200}
            width={400}
            preview={false}
            src="https://res.cloudinary.com/drhdgw1xx/image/upload/v1775572501/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_obvyeq.png"
          />
        </Row>
        <p style={{ fontFamily: 'sans-serif' }} className="text-center h4">
          Phần mềm quản lý công việc
        </p>
        <Form.Item
          name="ten_dang_nhap"
          rules={[{ required: true, message: 'Vui lòng nhập tài khoản đăng nhập!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nhập tài khoản đăng nhập" />
        </Form.Item>
        <Form.Item name="mat_khau" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input prefix={<LockOutlined />} type="password" placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ tài khoản</Checkbox>
            </Form.Item>
            <a href="">Quên mật khẩu</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
