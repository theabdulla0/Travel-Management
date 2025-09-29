import { setUserData } from "../features/auth/authSlicer";
import { getMe } from "../features/auth/authThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await dispatch(getMe()).unwrap();
        dispatch(setUserData(res.data));
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
