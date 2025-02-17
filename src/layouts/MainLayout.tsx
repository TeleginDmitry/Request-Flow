import { Container } from "@mui/material";
import FilesModal from "@widgets/FilesModal/FilesModal";
import IndicateBalancesModal from "@widgets/IndicateBalancesModal/IndicateBalancesModal";
import WarehouseModal from "@widgets/SetWarehouseModal/SetWarehouseModal";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Container sx={{ paddingBottom: "50px" }} maxWidth="xl">
      <Outlet></Outlet>

      <Toaster />

      <IndicateBalancesModal title="Укажите остатки материалов"></IndicateBalancesModal>
      <WarehouseModal title="На какой склад прибыли материалы?"></WarehouseModal>
      <FilesModal title="Вложения"></FilesModal>
    </Container>
  );
}
