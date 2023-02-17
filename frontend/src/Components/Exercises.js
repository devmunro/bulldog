import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../features/exerciseSlice";
import FirebaseStorage from "../images/firebaseStorage";
import ExerciseCatergories from "./exerciseCatergories";
import Loading from "./Loading";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);

  const defaultWorkout = useSelector(state => state.fitness.defaultWorkout);

  

  const [exerciseDetails, setExerciseDetails] = useState({
    exerciseID: "",
    exerciseSets: 3,
    exerciseReps: 8,
    exerciseWeight: 10,
  });

  const [exerciseInputs, setExerciseInputs] = useState({});

  const dispatch = useDispatch()

  //handle add to workout

  const handleAddToWorkout = async (id) => {
    setExerciseDetails({
      exerciseID: id,
      exerciseSets: exerciseInputs[id]?.sets ?? 3,
      exerciseReps: exerciseInputs[id]?.reps ?? 8,
      exerciseWeight: exerciseInputs[id]?.weight ?? 10,
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
      <section className="flex flex-wrap  w-[95%] bg-black">
        {!loading &&
          exerciseList.map((exercise) => {
            return (
              <div className="w-full flex-wrap">
                <div className=" flex justify-between text-white bg-[#2B2946] m-2 p-4">
                  <ul
                    key={exercise._id}
                    className=" w-1/3 text-sm flex-col flex justify-between"
                  >
                    <li className="mb-4 text-3xl">{exercise.name}</li>

                    <li className="rounded-xl border-2 border-black w-min px-2 bg-black">
                      Type:
                      {exercise.body_type
                        .map((type) => type.toUpperCase())
                        .join(", ")}
                    </li>
                    <li className="rounded-xl border-2 border-black w-min px-2 bg-white text-black">
                      Equipment:
                      {exercise.equipment
                        .map((type) => type.toUpperCase())
                        .join(", ")}
                    </li>
                  </ul>
                  <form className="flex items-end  ">
                    <fieldset className="mx-2  border-r-2 border-white ">
                      <label>SETS</label>
                      <input
                        placeholder="3"
                        className="w-12 h-12 mx-4 text-center text-2xl text-black"
                        value={exerciseInputs[exercise._id]?.sets ?? 3}
                        name="sets"
                        onChange={handleChange(exercise._id)}
                      ></input>
                    </fieldset>
                    <fieldset className="mx-2  border-r-2 border-white ">
                      <label>REPS</label>
                      <input
                        placeholder="8"
                        className="w-12 h-12 mx-4 text-center text-2xl text-black"
                        value={exerciseInputs[exercise._id]?.reps ?? 8}
                        name="reps"
                        onChange={handleChange(exercise._id)}
                      ></input>
                    </fieldset>{" "}
                    <fieldset className="mx-2  border-r-2 border-white ">
                      <label>WEIGHT</label>
                      <input
                        placeholder="10"
                        className="w-12 h-12 mx-4 text-center text-2xl text-black"
                        value={exerciseInputs[exercise._id]?.weight ?? 10}
                        name="weight"
                        onChange={handleChange(exercise._id)}
                      ></input>
                    </fieldset>
                  </form>
                  <div className="space-y-4  flex items-end ">
                    {/* <FirebaseStorage imageBase={exercise.img} /> */}
                    <button
                      className="bg-white text-black p-2 h-16 "
                      onClick={() => handleAddToWorkout(exercise._id)}
                    >
                      Add to workout
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {loading && <Loading />}
      </section>
    </div>
  );
}
