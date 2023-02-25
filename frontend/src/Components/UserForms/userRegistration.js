import React, { useEffect, useState } from "react";
import { registerUser, clearState } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { loading, error, success } = useSelector((state) => state.auth);

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

    const { passwordConfirmation, ...userData } = formData;

    const registerDataResult = await dispatch(registerUser(userData));
    console.log(registerDataResult.response);

    if (success) {
      navigate("/");
      console.log("User created");
    }

    if (error) {
      console.log(error);
    }
  };

  // clear state on unmount
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      {error && (
        <div
          class="flex items-center justify-center w-1/2 lg:w-1/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded "
          role="alert"
        >
          <strong class="font-bold space-x-2">{error}</strong>
         
          <span class=" px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className="w-1/2 lg:w-1/3 ring-4 rounded-t-xl shadow-2xl  ">
        <div className="flex-col items-center flex bg-[#2B2946]">
          <h2 className="text-xl text-white font-bold mt-4">Sign up here</h2>
          <p className="text-white">
            Create your account in just a few clicks.
          </p>

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
              name="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="Password Confirmation"
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
              required
            />

            {!loading && (
              <button
                className="bg-blue-800 text-white font-bold"
                type="submit"
              >
                Submit
              </button>
            )}

            {loading && (
              <button
                disabled
                className="items-center bg-blue-800 text-white font-bold"
                type="submit"
              >
                <Loading text="REGISTERING" />
              </button>
            )}
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
      </div>
    </div>
  );
};

export default RegisterForm;
