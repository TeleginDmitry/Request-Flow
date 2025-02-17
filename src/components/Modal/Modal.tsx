import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  title?: string;
  isOpen: boolean;
  toggleOpen: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  buttons?: React.ReactNode;
  onSubmitForm?: (e: React.FormEvent) => void;
}

export default function Modal({
  title = "Введите данные",
  isOpen,
  toggleOpen,
  size = "xs",
  children,
  buttons,
  onSubmitForm,
}: Props) {
  function onSubmitHandle(event: React.FormEvent) {
    event.preventDefault();
    onSubmitForm?.(event);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={toggleOpen}
        maxWidth={size}
        PaperProps={{
          component: "form",
          onSubmit: onSubmitHandle,
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{title}</span>
            <IconButton onClick={toggleOpen}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 1 }}>{children}</Box>
        </DialogContent>
        <DialogActions>{buttons}</DialogActions>
      </Dialog>
    </>
  );
}
