import { useContext, useState } from "react";
import Modal from "@components/Modal/Modal";
import Button from "@mui/material/Button";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { WarehouseContext } from "@contexts/Warehouse.context";

interface Props {
  title: string;
}

export default function WarehouseModal({ title }: Props) {
  const { isOpen, toggleOpen, warehouses } = useContext(WarehouseContext);

  const [radioValue, setRadioValue] = useState(1);

  function onSubmitForm() {
    toggleOpen();
  }

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      buttons={
        <>
          <Button onClick={toggleOpen}>Отмена</Button>
          <Button type="submit">Указать склад</Button>
        </>
      }
      onSubmitForm={onSubmitForm}
    >
      {
        <RadioGroup
          defaultValue="1"
          value={radioValue}
          onChange={(e) => setRadioValue(+e.target.value)}
        >
          {warehouses.map((warehouse) => (
            <FormControlLabel
              key={warehouse.id}
              value={warehouse.id}
              control={<Radio />}
              label={warehouse.name}
            />
          ))}
        </RadioGroup>
      }
    </Modal>
  );
}
