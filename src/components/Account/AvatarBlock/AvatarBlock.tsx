import Avatar from "@mui/material/Avatar";
import { Box, Tooltip } from "@mui/material";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  firstLetters: string;
}

export default function AvatarBlock({ setIsOpen, firstLetters }: Props) {
  function toggleIsOpen() {
    setIsOpen((state) => !state);
  }

  return (
    <Box onClick={toggleIsOpen} sx={{ cursor: "pointer" }}>
      <Tooltip title="Профиль">
        <Avatar sx={{ background: "#fff", color: "#ff6600", fontSize: 15 }}>
          {firstLetters}
        </Avatar>
      </Tooltip>
    </Box>
  );
}
