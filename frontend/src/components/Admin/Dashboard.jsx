import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authState";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="h-screen flex ">
      <div className=" bg-black text-white pt-8 rounded-3xl ">
        <Link to ="/dashboard/teacher" className=" bg-red-500 p-1 px-2 rounded-md mx-3">Add Teacher</Link>
      </div>
      {/* second div*/}
      <div className="flex flex-col mx-auto justify-center items-center ">
        <h1 className="font-bold text-3xl mx-auto ">Welcome Admin here </h1>
        <p className="flex  p-6 text-blue-600">Email is {email}</p>

        <button
          className="flex h-fit bg-red-500 text-white px-4 py-2 rounded hover:bg-sky-700 ."
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
