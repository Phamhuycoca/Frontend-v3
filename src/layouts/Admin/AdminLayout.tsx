import React from 'react';
import {
  BellOutlined,
  CloseCircleOutlined,
  SaveOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Col,
  Dropdown,
  Input,
  Layout,
  List,
  Menu,
  Row,
  Space,
  theme,
} from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { createStyles } from 'antd-style';

const { Header, Content, Sider } = Layout;
const items3: MenuProps['items'] = [
  {
    label: 'Quản lý người dùng',
    key: 'nguoi-dung',
  },
  {
    label: 'Quản lý danh mục',
    key: 'danh-muc',
  },
];

const items: MenuProps['items'] = [
  {
    label: 'Thông tin tài khoản',
    key: '0',
  },
  {
    label: 'Cài đặt',
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Đăng xuất',
    key: '3',
  },
];
type ListMemu = {
  key?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
};
const ListMenus: ListMemu[] = [
  {
    key: '1',
    icon: <SaveOutlined />,
    title: 'Save Post',
    description: 'Add this to your saved items',
  },
  {
    key: '2',
    icon: <CloseCircleOutlined />,
    title: 'Hide Post',
    description: 'See fewer posts like this',
  },
  {
    key: '3',
    icon: <UserDeleteOutlined />,
    title: 'Unfollow User',
    description: 'Stop seeing posts but stay friends',
  },
  {
    key: '4',
    icon: <BellOutlined />,
    title: 'Notifications',
    description: 'Turn on notifications for this post',
  },
];
const useStyles = createStyles(({ css }) => ({
  list: css`
    transition: all 0.3s ease;
    &:hover {
      background-color: #f0f2f5;
      .ant-list-item-meta-description > span {
        color: #48a3e6;
      }
    }
  `,
}));
const AdminLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { styles, cx } = useStyles();
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={'12%'} theme="light">
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items3}
          onClick={(e) => {
            navigate(e.key, { replace: true });
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{ width: '100%', height: '100%', padding: '0 15px' }}
          >
            <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý danh mục' }]} />
            <Row
              justify="space-between"
              align="middle"
              style={{
                width: '50%',
              }}
            >
              <Col
                span={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Input.Search
                  size="large"
                  placeholder="Nhập thông tin tìm kiếm"
                  variant="outlined"
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Space>
                  <Dropdown
                    placement="bottomRight"
                    arrow
                    trigger={['click']}
                    overlayStyle={{ width: 300 }}
                    dropdownRender={() => (
                      <div style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
                        <List
                          style={{ cursor: 'pointer' }}
                          itemLayout="horizontal"
                          dataSource={ListMenus}
                          renderItem={(item, index) => (
                            <List.Item className={cx(styles.list)}>
                              <List.Item.Meta
                                key={index}
                                avatar={
                                  <div style={{ fontSize: 18 }} className="ms-2">
                                    {item.icon}
                                  </div>
                                }
                                title={<span>{item.title}</span>}
                                description={
                                  <span style={{ fontSize: 14 }}>{item.description}</span>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Badge count={50} className="me-3">
                        <BellOutlined style={{ fontSize: '24px' }} />
                      </Badge>
                    </a>
                  </Dropdown>

                  <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer',
                        maxWidth: 200,
                      }}
                    >
                      <Avatar size={42} src={<img draggable={false} src={} alt="avatar" />} />

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          lineHeight: 1.2,
                        }}
                      >
                        <span
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                          }}
                        >
                          Phạm Khắc Huy
                        </span>

                        <span
                          style={{
                            fontSize: 12,
                            color: '#8c8c8c',
                          }}
                        >
                          🟢 Online
                        </span>
                      </div>
                    </div>
                  </Dropdown>
                </Space>
              </Col>
            </Row>
          </Row>
        </Header>
        <Content
          style={{
            margin: '20px 16px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: '16px 16px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
