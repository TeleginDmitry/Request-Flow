import Modal from "@components/Modal/Modal";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useContext } from "react";
import { BalanceContext } from "@contexts/Balance.context";
import { updateMetarial } from "@services/materials.service";
import { changeStatus } from "@services/requests.service";
import useFetching from "@hooks/useFetching";
import { createHistory } from "@services/history.service";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import { historyStatuses } from "@configs/historyStatuses";
import toast from "react-hot-toast";

interface Props {
  title: string;
}

export default function IndicateBalancesModal({ title }: Props) {
  const {
    isOpen,
    materials,
    resetValues,
    requestId,
    changeResidueOfMaterial,
    toggleOpen,
  } = useContext(BalanceContext);

  const user = useAppSelector(userSelector);

  const { fetchQuery } = useFetching({
    callback: async () => {
      if (!requestId || !user) return;

      try {
        materials.forEach(async (material) => {
          await updateMetarial({ ...material });
        });

        await changeStatus({
          requestId,
        });

        await createHistory({
          request_id: requestId,
          user_id: user.id,
          history_status: historyStatuses.STOCKS_SPECIFIED,
        });

        toast.success("Успешно");
      } catch (error) {
        toast.error("Произошла ошибка");
      }
    },
    onSuccess: () => {
      resetValues();
      toggleOpen();
    },
  });

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      buttons={
        <>
          <Button onClick={toggleOpen}>Отмена</Button>
          <Button type="submit">Указать остатки</Button>
        </>
      }
      onSubmitForm={fetchQuery}
    >
      {materials.map((material) => (
        <TextField
          key={material.id}
          margin="dense"
          autoFocus
          required
          label={material.name}
          onChange={(e) =>
            changeResidueOfMaterial(+e.target.value, material.id)
          }
          value={material.residue}
          fullWidth
        />
      ))}
    </Modal>
  );
}
