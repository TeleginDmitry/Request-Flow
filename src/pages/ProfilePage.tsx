import ProfileHeader from "@widgets/ProfileHeader/ProfileHeader";
import ProfileUserData from "@widgets/ProfileUserData/ProfileUserData";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { logoutUser } from "@store/user/user.slice";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import { makeFirstLettersFromName } from "@utils/helpers/makeFirstLettersFromName";

export function ProfilePage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);

  if (!user) return null;

  const firstLetters = makeFirstLettersFromName(user.name);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <ProfileHeader />
      <ProfileUserData
        firstLetters={firstLetters}
        user={user}
        logout={logout}
      />
    </>
  );
}
