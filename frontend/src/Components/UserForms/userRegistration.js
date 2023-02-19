import React, { useEffect, useState } from "react";
import { clearState, registerUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ handleClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const { user, loading, error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = await dispatch(registerUser(formData));
    console.log(userData);
  };

  return (
    <div className="flex-col items-center flex bg-[#2B2946]">
      <h2 className="text-xl text-white font-bold mt-4">Sign up here</h2>
      <p className="text-white">Create your account in just a few clicks.</p>

      <form
        className="flex-col flex space-y-2 px-8 w-full h-full p-4 [&>*]:p-2 [&>*]:rounded-md [&>*]:border-2 [&>*]:border-gray-300"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="date"
          name="dob"
          id="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Password Confirmation"
          value=""
          onChange={handleInputChange}
        />

        <button className="bg-blue-800 text-white font-bold" type="submit">
          Submit
        </button>
      </form>

      <p className="bg-white w-full text-center">
        Already have an account?
        <span>
          <button onClick={handleClick} className="px-2 italic">
            Click Here
          </button>
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
