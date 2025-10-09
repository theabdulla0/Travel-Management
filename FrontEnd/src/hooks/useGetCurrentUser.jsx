import { getMe, logout } from "../features/auth/authThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        await dispatch(getMe()).unwrap();
      } catch (error) {
        if (
          isMounted &&
          (error?.status === 401 || error?.message === "Unauthorized")
        ) {
          dispatch(logout());
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);
}

export default useGetCurrentUser;
