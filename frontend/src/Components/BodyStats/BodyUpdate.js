import React, { useState } from "react";

function BodyUpdate({ onClose }) {
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // close the modal
    onClose();
  };

  return (
    <div>
      <h1>Update Body Stats</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default BodyUpdate;
