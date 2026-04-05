import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import ModalService, { type ConfirmModalState } from '../../utils/services/ModalService';

export const GlobalModalDelete = () => {
  const [state, setState] = useState<ConfirmModalState | null>(null);

  useEffect(() => {
    const sub = ModalService.modal$.subscribe((res) => {
      setState(res);
    });
    return () => sub.unsubscribe();
  }, []);

  if (!state) return null;

  return (
    <Modal
      title={state.title || 'Xác nhận'}
      open={state.open}
      okText="Xóa"
      cancelText="Đóng"
      onOk={() => {
        state.resolve(true);
        ModalService.close();
      }}
      onCancel={() => {
        state.resolve(false);
        ModalService.close();
      }}
    >
      <p>{state.content || 'Bạn có chắc chắn muốn xóa?'}</p>
    </Modal>
  );
};
