import { useState } from "react";

import AvatarBlock from "./AvatarBlock/AvatarBlock";
import AccountWindow from "./AccountWindow/AccountWindow";
import { userSelector } from "@store/user/user.selectors";
import { useAppSelector } from "@hooks/useAppSelector";
import { makeFirstLettersFromName } from "@utils/helpers/makeFirstLettersFromName";
import { Backdoor } from "@components/Backdoor/Backdoor";

export default function Account() {
  const user = useAppSelector(userSelector);

  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const firstLetters = makeFirstLettersFromName(user.name);

  return (
    <>
      <AvatarBlock firstLetters={firstLetters} setIsOpen={setIsOpen} />

      {isOpen && (
        <>
          <AccountWindow firstLetters={firstLetters} />
          <Backdoor onClick={() => setIsOpen(false)}></Backdoor>
        </>
      )}
    </>
  );
}
