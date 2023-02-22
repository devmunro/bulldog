import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../features/exerciseSlice";
import FirebaseStorage from "../images/firebaseStorage";
import ExerciseCatergories from "./exerciseCatergories";
import Loading from "./Loading";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);

  const defaultWorkout = useSelector((state) => state.fitness.defaultWorkout);

  console.log(defaultWorkout);

  const [exerciseDetails, setExerciseDetails] = useState({
    exerciseID: "",
    exerciseSets: 3,
    exerciseReps: 8,
    exerciseWeight: 10,
  });

  const [exerciseInputs, setExerciseInputs] = useState({});

  const dispatch = useDispatch();

  //handle add to workout

  const handleAddToWorkout = async (id) => {
    setExerciseDetails({
      exerciseID: id,
      exerciseSets: exerciseInputs[id]?.sets ?? 3,
      exerciseReps: exerciseInputs[id]?.reps ?? 8,
      exerciseWeight: exerciseInputs[id]?.weight ?? 10,
      selectedWorkout: defaultWorkout,
    });
  };

  useEffect(() => {
    if (exerciseDetails.exerciseID) {
      dispatch(addExercise(exerciseDetails));
    }
  }, [exerciseDetails, dispatch]);

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
  return (
    <div>
      <ExerciseCatergories
        setExerciseList={setExerciseList}
        setLoading={setLoading}
      />
      <section className="">
        {!loading &&
          exerciseList.map((exercise) => {
            return (

              // TABLE
              <table className="table-fixed text-white">
                <thead>
                  <tr>
                    <th className="">Name</th>
                    <th>Type</th>
                    <th>Equipment</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Weight(KG)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* EXERCISE NAME */}
                    <td>{exercise.name}</td>

                    {/* Exercise BODY TYPE */}

                    <td>
                      {exercise.body_type
                        .map((type) => type.toUpperCase())
                        .join(", ")}
                    </td>

                    {/* Exercise EQUIPMENT */}
                    <td>
                      {" "}
                      {exercise.equipment
                        .map((type) => type.toUpperCase())
                        .join(", ")}
                    </td>

                    {/* SETS  */}
                    <td>
                      <input
                        placeholder="3"
                        className="w-12 h-12 mx-4 text-center text-2xl text-black"
                        value={exerciseInputs[exercise._id]?.sets ?? 3}
                        name="sets"
                        onChange={handleChange(exercise._id)}
                      ></input>
                    </td>

                    {/* REPS */}
                    <td>
                      <input
                        placeholder="8"
                        className="w-12 h-12 mx-4 text-center text-2xl text-black"
                        value={exerciseInputs[exercise._id]?.reps ?? 8}
                        name="reps"
                        onChange={handleChange(exercise._id)}
                      ></input>
                    </td>

                    {/* WEIGHTS KG */}
                    <td>
                      <input
                        placeholder="10"
                        className="w-12 h-12 mx-4 text-center text-2xl text-black"
                        value={exerciseInputs[exercise._id]?.weight ?? 10}
                        name="weight"
                        onChange={handleChange(exercise._id)}
                      ></input>
                    </td>

                    {/* ADD TO WORKOUT BUTTTON */}
                    <td>
                      <button
                        className="bg-white text-black p-2 h-16 "
                        onClick={() => handleAddToWorkout(exercise._id)}
                      >
                        Add to workout
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        {loading && <Loading />}
      </section>
    </div>
  );
}
