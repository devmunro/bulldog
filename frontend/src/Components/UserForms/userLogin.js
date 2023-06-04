import React, { useEffect, useState } from "react";
import { clearState, loginUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { XMarkIcon } from "@heroicons/react/24/solid";

const LoginForm = ({openModal}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, user } = useSelector((state) => state.auth);

  const handleInputChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    userLogin(loginData);
  };

  //  pass data to redux
  const userLogin = async (data) => {
    try {
      await dispatch(loginUser(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [dispatch, loading, success, error, navigate]);

  return (
    <div className="relative">
     
      {/* CLOSE BOX */}
      <div className="absolute top-0 right-0 p-2">
        <XMarkIcon width="24" height="24" onClick={openModal} className="text-white cursor-pointer" />
      </div>
      {error && (
        <div class="flex items-center justify-center bg-tertiary text-white px- py-3 rounded">
          <strong class="f ont-bold space-x-2">{error}</strong>
        </div>
      )}
      <div className=" bg-primary text-secondary flex-col items-center flex border-2 space-y-8 ">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mt-8">
          Login
        </h2>
        <p className="text-gray-300 text-xl">Sign in to your account</p>

        <form
          className="flex-col flex space-y-8 px-16 w-full p-8"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleInputChange}
            required
            className="w-full text-tertiary rounded-md p-2"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            required
            className="w-full text-tertiary rounded-md p-2"
          />
          <div className="py-8">
            {!loading && (
              <button className="btn-secondary w-full ">Submit</button>
            )}

            {loading && (
              <button
                disabled
                className="btn-secondary text-black w-full hover:bg-tertiary"
              >
                <Loading />
              </button>
            )}
          </div>
        </form>
        {/* <p className="text-gray-300 text-xl p-2">
      Don't have an account?
      <button onClick={handleClick} className="text-purple-600 italic ml-2">
        Click Here
      </button>
    </p> */}
      </div>
    </div>
  );
};

export default LoginForm;
