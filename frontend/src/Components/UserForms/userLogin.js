import React, { useEffect, useState } from "react";
import { clearState, registerUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, success } = useSelector((state) => state.auth);

  const handleInputChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginData);
  };

  //  pass data to redux
  const userRegistration = async (data) => {};

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (success) {
      navigate("/dashboard");
    }

    dispatch(clearState());
  }, [dispatch, error, success, navigate]);

  return (
    <form
      className="flex-col flex space-y-2 w-1/2 h-full p-8"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={loginData.email}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={loginData.password}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
