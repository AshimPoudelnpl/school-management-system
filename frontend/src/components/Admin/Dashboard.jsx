import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authState";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { email, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/not-found");
    }
  }, [isAuth]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="h-screen flex justify-center">
      <h1 className="font-bold text-3xl">Welcome Admin here </h1>
      <p>Email is {email}</p>

      <button
        className=" h-fit bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
