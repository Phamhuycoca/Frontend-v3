import {
  CommonButton,
  CreateButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from './components/Button';
const App = () => {
  return (
    <>
      <CreateButton />
      <EditButton />
      <DeleteButton />
      <SaveButton />
      <CommonButton text="Thêm mới" icon="tabler:alarm-minus-filled" />
    </>
  );
};
export default App;
