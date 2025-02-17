import { useEffect } from "react";
import {
  errorUserSelector,
  isLoadingUserSelector,
  userSelector,
} from "@store/user/user.selectors";
import { testFetchUser } from "@store/user/user.actions";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";

export default function UserDetails() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);
  const loading = useAppSelector(isLoadingUserSelector);
  const error = useAppSelector(errorUserSelector);

  useEffect(() => {
    dispatch(testFetchUser());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Details</h1>
      {user ? (
        <div data-testid="user">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
