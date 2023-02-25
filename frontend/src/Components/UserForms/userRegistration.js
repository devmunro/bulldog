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
    <div>
      {error && (
        <div
          className="flex items-center justify-center w-1/2 lg:w-1/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded "
          role="alert"
        >
          <strong className="font-bold space-x-2">{error}</strong>
        </div>
      )}
      <div className="w-full md:px-2 lg:px-4">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Sign Up Here
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Create your account in just a few clicks.
          </p>

          <form
            className="flex flex-col space-y-4 w-full mx-auto p-4 bg-gray-800 rounded-md border-2 border-gray-300"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-white mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-gray-800 p-2 rounded-md border-2 border-gray-300 text-gray-300 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dob" className="text-white mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleInputChange}
                required
                className="bg-gray-800 p-2 rounded-md border-2 border-gray-300 text-gray-300 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-gray-800 p-2 rounded-md border-2 border-gray-300 text-gray-300 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-white mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-gray-800 p-2 rounded-md border-2 border-gray-300 text-gray-300 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="passwordConfirmation" className="text-white mb-2">
                Password Confirmation
              </label>
              <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="Password Confirmation"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
                required
                className="bg-gray-800 p-2 rounded-md border-2 border-gray-300 text-gray-300 focus:outline-none focus:border-purple-600"
              />
            </div>
            {!loading ? (
    <button className="btn-primary" type="submit">
      Register
    </button>
  ) : (
    <button
      disabled
      className="items-center bg-blue-800 text-white font-bold"
      type="submit"
    >
      <Loading text="REGISTERING" />
    </button>
  )}
 
</form>
<p className="w-full text-center pt-2 pb-4">
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
