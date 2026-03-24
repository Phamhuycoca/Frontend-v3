import { Space } from 'antd';
import {
  CommonButton,
  CreateButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from './components/Button';
import { TableList } from './components/Table/TableList';
const App = () => {
  return (
    <>
      <TableList
        isLoading={false}
        dataSource={[
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
        ]}
        columns={[
          {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Hành động',
            key: 'action',
            render: () => (
              <Space>
                <EditButton onClick={() => {}} />
                <DeleteButton onClick={() => {}} />
              </Space>
            ),
          },
        ]}
      />
    </>
  );
};
export default App;
