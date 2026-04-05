import { useEffect } from 'react';
import AlertService, { type AlertState } from '../../utils/services/AlertService';
import { App } from 'antd';

export const GlobalAlert: React.FC = () => {
  const { modal } = App.useApp();
  useEffect(() => {
    const sub = AlertService.alert$.subscribe((state: AlertState) => {
      if (!state.content) return;

      switch (state.type) {
        case 'success':
          modal.success({
            title: state.title || 'Thành công',
            content: state.content,
            okText: 'Đóng',
          });
          break;

        case 'error':
          modal.error({
            title: state.title || 'Lỗi',
            content: state.content,
            okText: 'Đóng',
          });
          break;

        case 'warning':
          modal.warning({
            title: state.title || 'Cảnh báo',
            content: state.content,
            okText: 'Đóng',
          });
          break;

        default:
          modal.info({
            title: state.title || 'Thông tin',
            content: state.content,
            okText: 'Đóng',
          });
          break;
      }
    });

    return () => sub.unsubscribe();
  }, []);

  return null;
};
