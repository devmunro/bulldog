import React, { useEffect, useState } from "react";
import { clearState, loginUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const LoginForm = () => {
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

  const handleClick = () => {
    navigate("/register");
  };

  console.log("state:", user);
  console.log("local:", localStorage.getItem("user"));
  return (
    <div className="flex-col items-center flex bg-[#2B2946]">
      <h2 className="text-xl mt-4 font-bold text-white">Login</h2>
      <p className="text-white">Sign in to your account</p>

      <form
        className=" flex-col flex space-y-2 px-8 w-full h-full p-4 [&>*]:p-2 [&>*]:rounded-md [&>*]:border-2 [&>*]:border-gray-300"
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
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInputChange}
          required
        />

        {!loading && (
          <button className="bg-blue-800 text-white font-bold" type="submit">
            Submit
          </button>
        )}

{loading && (
          <button disabled className="items-center bg-blue-800 text-white font-bold" type="submit">
            <Loading/>
          </button>
        )}
      </form>
      <p className="bg-white w-full text-center">
        Don't have an account?
        <span>
          <button onClick={handleClick} className="px-2 italic">
            Click Here
          </button>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
