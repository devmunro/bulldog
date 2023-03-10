import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { addExercise } from "../features/exerciseSlice";
import { resetAlert } from "../features/exerciseSlice";



export default function ExerciseList({ loading, exerciseList, isDisabled }) {
  const [exerciseInputs, setExerciseInputs] = useState({});
  const { alert } = useSelector(
    (state) => state.fitness
  );
  const { currentWorkout } = useSelector((state) => state.fitness);
  const [showAlert, setShowAlert] = useState(false);

  const [disabled, setDisabled] = useState(isDisabled);
  const [currentPage, setCurrentPage] = useState("");

  const [exerciseDetails, setExerciseDetails] = useState({
    exerciseID: "",
    exerciseSets: 3,
    exerciseReps: 12,
    exerciseWeight: 10,
  });

  // set the current page in the useEffect hook
  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  const dispatch = useDispatch();
  //handle add to workout
  const handleAddToWorkout = async (id, name, bodyType, equipment) => {
    const newExerciseDetails = ({
      exerciseID: id,
      exerciseBodyType: bodyType,
      exerciseEquipment: equipment,
      exerciseSets: 3,
      exerciseReps: 8,
      exerciseWeight: 10,
      selectedWorkout: currentWorkout._id,
    });
       setExerciseDetails(newExerciseDetails);
    console.log(newExerciseDetails);
   const response = await  dispatch(addExercise(newExerciseDetails));
    console.log(response)
  };

  //handle edit exercise for current workout
  const handleEditExercise = async (id) => {
    setDisabled(false);
  };
  //handlechange for inputs
  const handleChange = (id) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setExerciseInputs((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: parseInt(value),
      },
    }));
  };

  useEffect(() => {
    if (alert) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        dispatch(resetAlert());
      }, 3000); // hide after 3 seconds
    }
  }, [alert, dispatch]);

  return (
    <div className="md:mx-2">
      <p className=" text-gray-400 bg-red-900 uppercase text-sm text-center">
        Current Workout:<strong>{currentWorkout.name}</strong>
      </p>
      {!loading &&
        exerciseList &&
        exerciseList.length > 0 &&
        exerciseList.map((exercise) => {
          return (
            <div
              key={exercise._id}
              className=" bg-black text-white md:my-4 my-2 md:py-4 flex items-center justify-center text-center "
            >
              {/* EXERCISE NAME */}
              <div className=" text-md  md:text-lg m-2  flex-col font-semibold text-left w-2/3">
                <h3>{exercise.name}</h3>
                {currentPage === "/dashboard/exerciselist" && (
                  <div className="uppercase flex text-gray-500 space-x-4 text-sm md:text-md">
                    <p className="p-2 rounded-lg">{exercise.body_type}</p>{" "}
                    <p className="p-2 rounded-lg">{exercise.equipment}</p>
                  </div>
                )}

                {/* SET REPS AND WEIGHTS SECTION */}
                {currentPage === "/dashboard/workout" && (
                  <div className="flex space-x-4 text-gray-400 text-center text-sm">
                    <div className="md:p-4 my-2 ">
                      Sets
                      <input
                        placeholder={exercise.sets || 3}
                        className={` ${disabled ? "input" : "input-edit"}`}
                        value={
                          exerciseInputs[exercise._id]?.sets ??
                          exercise.sets ??
                          3
                        }
                        name="sets"
                        onChange={handleChange(exercise._id)}
                        disabled={disabled}
                      ></input>
                    </div>

                    <div className="md:p-4 my-2">
                      Rep
                      <input
                        placeholder="8"
                        className={` ${disabled ? "input" : "input-edit"}`}
                        value={
                          exerciseInputs[exercise._id]?.reps ??
                          exercise.reps ??
                          12
                        }
                        name="reps"
                        onChange={handleChange(exercise._id)}
                        disabled={disabled}
                      ></input>
                    </div>

                    <div className="md:p-4 my-2">
                      Weight
                      <input
                        placeholder="10"
                        className={` ${disabled ? "input" : "input-edit"}`}
                        value={
                          exerciseInputs[exercise._id]?.weight ??
                          exercise.weight ??
                          10
                        }
                        name="weight"
                        onChange={handleChange(exercise._id)}
                        disabled={disabled}
                      ></input>
                    </div>
                  </div>
                )}
              </div>

              {/* ADD TO WORKOUT BUTTON */}
              {currentPage === "/dashboard/exerciselist" && (
                <div className="md:p-4  my-2">
                  <button
                    className=" py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white"
                    onClick={() => handleAddToWorkout(
                      exercise._id,
                      exercise.name,
                      exercise.body_type,
                      exercise.equipment
                    )}
                  >
                    Add
                  </button>
                </div>
              )}

              {/* EDIT BUTTON */}
              {currentPage === "/dashboard/workout" && (
                <div className="md:p-4  my-2">
                  <button
                    className="btn-primary py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white"
                    onClick={handleEditExercise}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          );
        })}
  <div className="fixed top-0 right-0 z-50">
      {showAlert &&  alert && (
        <div className="p-4 bg-blue-500 text-white rounded-md transition duration-500 ease-in-out">
          {alert}
        </div>
      )}
    </div>

      {loading && <Loading />}
    </div>
  );
}
