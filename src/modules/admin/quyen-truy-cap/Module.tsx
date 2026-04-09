import { Route, Routes } from 'react-router-dom';
import { QuyenTruyCapList } from './QuyenTruyCapList';
import { QuyenTruyCapForm } from './QuyenTruyCapForm';

export const QuyenTruyCapModule = () => {
  return (
    <Routes>
      <Route path="/" element={<QuyenTruyCapList />}>
        <Route path="/:id" element={<QuyenTruyCapForm />} />
      </Route>
    </Routes>
  );
};
