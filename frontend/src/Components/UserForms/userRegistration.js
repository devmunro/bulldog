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
          className="flex items-center justify-center bg-tertiary text-white px- py-3 rounded"
          role="alert"
        >
          <strong className="font-bold space-x-2">
            {error || "Passwords do not match"}
          </strong>
        </div>
      ) : null}
      <div class="flex justify-center  bg-primary p-12 text-center text-secondary">
        <div class="flex flex-col items-center w-full">
          <h2 class="text-4xl font-bold text-white p-4 ">
            Sign Up Here
          </h2>
          <p class="text-lg mb-">Create your account in just a few clicks.</p>

          <form class="w-full p-6 space-y-4 md:space-y-6 text-tertiary rounded-lg ">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="sm:text-sm rounded-lg w-full p-2.5"
                />
              </div>

              <div>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className=" sm:text-sm rounded-lg w-full p-2.5 "
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className=" sm:text-sm rounded-lg w-full p-2.5 "                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className=" sm:text-sm rounded-lg w-full p-2.5 "                />
              </div>

              <div>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="Password Confirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleInputChange}
                  required
                  className=" sm:text-sm rounded-lg w-full p-2.5 "                />
              </div>
            </div>

            <div className="pt-8">
              {!loading && (
                <button
                  onClick={handleSubmit}
                  className="btn-secondary w-full"
                >
                  Submit
                </button>
              )}

              {loading && (
                <button
                  disabled
                  className="btn-secondary hover:bg-tertiary w-full"
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
