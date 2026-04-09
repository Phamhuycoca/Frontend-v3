import { Route, Routes } from 'react-router-dom';
import { VaiTroList } from './VaiTroList';
import { VaiTroForm } from './VaiTroForm';

export const VaiTroModule = () => {
  return (
    <Routes>
      <Route path="/" element={<VaiTroList />}>
        <Route path="/:id" element={<VaiTroForm />} />
      </Route>
    </Routes>
  );
};
