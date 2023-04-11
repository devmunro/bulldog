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
  const [passwordFail, setPasswordFail] = useState(false);

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
    setPasswordFail(false);
    if (formData.passwordConfirmation !== formData.password) {
      setPasswordFail(true);
      return;
    }

    const { passwordConfirmation, ...userData } = formData;

    const registerDataResult = await dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }

    if (error) {
      console.log(error);
    }
  }, [dispatch, loading, success, error, navigate]);

  // clear state on unmount
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return (
    <div>
      {error || passwordFail ? (
        <div
          className="flex items-center justify-center w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded "
          role="alert"
        >
          <strong className="font-bold space-x-2">
            {error || "Passwords do not match"}
          </strong>
        </div>
      ) : null}
      <div class="flex justify-center  md:p-4 lg:px-8">
        <div class="flex flex-col items-center mx-auto lg:w-1/2  w-full">
          <h2 class="text-xl font-bold text-white mb-2 md:text-2xl">
            Sign Up Here
          </h2>
          <p class="text-gray-500 text-lg mb-">
            Create your account in just a few clicks.
          </p>

          <form class="w-full p-6 space-y-4 md:space-y-6 bg-gray-800 text-white rounded-lg shadow ">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="name"
                  class="block mb-2 text-sm font-medium text-white"
                >
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
                  className="bg-gray-500 border-gray-300  text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="dob" class="block mb-2 text-sm font-medium">
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
                  className="bg-gray-500 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" class="block mb-2 text-sm font-medium">
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
                  className="bg-gray-500 border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  class="block mb-2 text-sm font-medium "
                >
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
                  className="bg-gray-500  border border-gray-300 e sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block mb-2 text-sm font-medium "
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
                  className="bg-gray-500 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              {!loading && (
                <button
                  onClick={handleSubmit}
                  className="w-full text-white bg-black hover:bg-primary-700 dark:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              )}

              {loading && (
                <button
                  disabled
                  className="w-full text-white bg-primary-600 dark:bg-primary-600 py-2 px-4 rounded"
                >
                  <Loading />
                </button>
              )}
            </div>
          </form>
          {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400 w-full text-center pt-2 pb-4">
            Already have an account?
            <span>
              <button
                onClick={handleClick}
                className="text-primary-600 dark:text-primary-500 hover:underline px-2 italic"
              >
                Click Here
              </button>
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
