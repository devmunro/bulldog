import React, { useEffect, useState } from "react";
import { clearState, registerUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: ""
  });

  const { user, loading, error, success} = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };


//handle submit
  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData);
        userRegistration(formData)
    
  };

  //  pass data to redux
  const userRegistration = async (formdata )  => {
    const userData = await dispatch(registerUser(formData))
    console.log(userData)
}

  useEffect(() => {
    
    if(error) {
        console.log(error)
    }
  
    if(success)
    {navigate("/dashboard")}


    dispatch(clearState())
  }, [dispatch, error, success, navigate])
  




  return (
    <form className="flex-col flex space-y-2 w-1/2 h-full p-8" onSubmit={handleSubmit}>
      <div className="space-x-4">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
</div>
<div className="space-x-4 ">
      <label htmlFor="dob">Date of Birth:</label>
      <input
        type="date"
        name="dob"
        id="dob"
        value={formData.dob}
        onChange={handleInputChange}
        required
      />
</div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />

<label htmlFor="passwordConfirm">Password Confirmation:</label>
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        value=""
        onChange={handleInputChange}
              />

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
