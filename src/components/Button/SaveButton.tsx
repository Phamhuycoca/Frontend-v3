import { Button } from 'antd';
import type { ButtonProps } from '../../types/ButtonProps';
import { SaveOutlined } from '@ant-design/icons';

export const SaveButton = ({ text = 'Lưu', onClick, size }: ButtonProps) => {
  return (
    <Button icon={<SaveOutlined />} color="blue" variant="solid" onClick={onClick} size={size}>
      {text}
    </Button>
  );
};
