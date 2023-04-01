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


  return (
    <div>
  {error && (
    <div class="flex items-center justify-center  bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong class="font-bold space-x-2">{error}</strong>
    </div>
  )}
  <div className="flex-col items-center flex bg-black border-2 border-white space-y-8">
    <h2 className="text-4xl sm:text-5xl font-bold text-white mt-8">
      Login
    </h2>
    <p className="text-gray-300 text-xl">Sign in to your account</p>

    <form
      className="flex-col flex space-y-2 px-8 w-full p-4"
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
        className="w-full bg-gray-800 text-gray-300 rounded-md p-2"
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleInputChange}
        required
        className="w-full bg-gray-800 text-gray-300 rounded-md p-2"
      />

      {!loading && (
        <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
          Submit
        </button>
      )}

      {loading && (
        <button disabled className="bg-purple-600 text-white py-2 px-4 rounded">
          <Loading />
        </button>
      )}
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
