import { getMe } from "../features/auth/authThunk";
// import { setUserData } from "../features/auth/authSlicer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await dispatch(getMe()).unwrap();
        // if (res?.data?.user) {
        // dispatch(setUserData({ user: res.data.user }));
        // }

        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // dispatch(logoutUser());
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
