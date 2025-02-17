import { useEffect } from "react";
import TitleBack from "@components/TitleBack/TitleBack";
import EditUserFields from "@widgets/EditUserFields/EditUserFields";
import { USERS_PAGE } from "@configs/routes";
import { useParams, useNavigate } from "react-router-dom";
import useFetching from "@hooks/useFetching";
import { UserType } from "@mytypes/api/user/user.types";
import { getUserById } from "@services/users.service";

export function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, fetchQuery } = useFetching<UserType>({
    callback: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const user = await getUserById(+userId);

      return user;
    },
  });

  function cancelClickHandle() {
    const isAbort = window.confirm(
      "Вы действительно хотите отменить все изменения?"
    );
    isAbort && navigate(USERS_PAGE);
  }

  useEffect(() => {
    fetchQuery();
  }, []);

  return (
    <>
      <TitleBack title="Редактирование пользователя" link={USERS_PAGE} />
      <EditUserFields user={data} abortClickHandle={cancelClickHandle} />
    </>
  );
}
