import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBodyWeightRecord, getBodyWeight, toggleRefresh } from "../../features/bodySlice";

function BodyUpdate({ onClose }) {
  const [weight, setWeight] = useState("");
  const userID = useSelector((state) => state.auth.user._id);

  console.log("here is thebody euser", userID);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addBodyWeightRecord({ userID: userID, weight: weight }));

    dispatch(toggleRefresh()); // toggle the refresh state

    // close the modal
    onClose();
  };

  return (
    <div className="bg-secondary rounded-lg p-8 z-50 space-y-2 text-center">
      <h1 className="sub-heading ">Update Body Stats</h1>
      <h3 className="defaultFont ">Today's Stats</h3>
      <form
        onSubmit={handleSubmit}
        className="flex-col flex items-center space-y-4 link"
      >
        <label className="m-4 p-4">
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="m-4 p-2 text-black"
          />
        </label>
        <button className="btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default BodyUpdate;
