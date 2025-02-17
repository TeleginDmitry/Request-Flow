import { useState } from "react";
import UsersTable from "@widgets/UsersTable/UsersTable";
import UsersToolBar from "@widgets/UsersToolBar/UsersToolBar";
import CreateUserModal from "@widgets/CreateUserModal/CreateUserModal";

export function UsersPage() {
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);

  function toggleOpen() {
    setIsOpenCreateUserModal((state) => !state);
  }

  return (
    <>
      <UsersToolBar toggleOpen={toggleOpen} />
      <UsersTable />
      <CreateUserModal
        title="Создать нового пользователя"
        isOpen={isOpenCreateUserModal}
        toggleOpen={toggleOpen}
      />
    </>
  );
}
