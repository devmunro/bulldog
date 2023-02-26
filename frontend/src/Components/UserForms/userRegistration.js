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
          className="flex items-center justify-center w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded "
          role="alert"
        >
          <strong className="font-bold space-x-2">{error}</strong>
        </div>
      )}
      <div className="w-full md:p-4 lg:px-8 bg-black border-2 border-white ">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Sign Up Here
          </h2>
          <p className="text-gray-300 text-lg mb-">
            Create your account in just a few clicks.
          </p>

          <form className="w-full mx-auto p-4 bg-gray-800 rounded-md border-2 border-gray-300 ">
            <div className="grid grid-cols-1 gap-4 ">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
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
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-300 rounded-md shadow-sm text-gray-300 focus:outline-none focus:border-purple-600 focus:ring focus:ring-purple-600 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-white mb-2">
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
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-300 rounded-md shadow-sm text-gray-300 focus:outline-none focus:border-purple-600 focus:ring focus:ring-purple-600 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
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
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-300 rounded-md shadow-sm text-gray-300 focus:outline-none focus:border-purple-600 focus:ring focus:ring-purple-600 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white mb-2">
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
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-300 rounded-md shadow-sm text-gray-300 focus:outline-none focus:border-purple-600 focus:ring focus:ring-purple-600 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-white mb-2"
                >
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
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-300 rounded-md shadow-sm text-gray-300 focus:outline-none focus:border-purple-600 focus:ring focus:ring-purple-600 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              {!loading ? (
                <button onClick={handleSubmit} className="btn-primary w-full" type="submit">
                  Register
                </button>
              ) : (
                <button
                  disabled
                  className=" w-full items-center bg-blue-800 text-white font-bold"
                  type="submit"
                >
                  <Loading text="REGISTERING" />
                </button>
              )}
            </div>
          </form>
          <p className="w-full text-center pt-2 pb-4 text-white">
            Already have an account?
            <span>
              <button onClick={handleClick} className="text-blue-400 px-2 italic">
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
