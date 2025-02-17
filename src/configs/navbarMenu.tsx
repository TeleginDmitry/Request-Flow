import { UserType } from "@mytypes/api/user/user.types";
import {
  PROFILE_PAGE,
  REQUESTS_PAGE,
  ARCHIVE_PAGE,
  USERS_PAGE,
  DIVISIONS_PAGE,
} from "@configs/routes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import SummarizeIcon from "@mui/icons-material/Summarize";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import { ADMIN } from "./userRoles";

function getNavbarMenu(user: UserType | null) {
  if (!user) return [];

  const menu = [
    {
      title: "Профиль",
      icon: <AccountCircleIcon />,
      link: PROFILE_PAGE,
    },
    {
      title: "Заявки снабжение",
      icon: <SummarizeIcon />,
      link: REQUESTS_PAGE,
    },
    {
      title: "Архив заявок",
      icon: <ArchiveIcon />,
      link: ARCHIVE_PAGE,
    },
  ];

  if (user.role.name === ADMIN) {
    menu.push({
      title: "Пользователи",
      icon: <GroupIcon />,
      link: USERS_PAGE,
    });
  }

  if (user.role.name === ADMIN) {
    menu.push({
      title: "Отделы",
      icon: <BusinessIcon />,
      link: DIVISIONS_PAGE,
    });
  }

  return menu;
}

export { getNavbarMenu };
