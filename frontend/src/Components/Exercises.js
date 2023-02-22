import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../features/exerciseSlice";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    console.log(`Searching for "${searchTerm}"`);

    const searchExercises = exerciseList.filter((word) => {
      return word.name.includes(searchTerm);
    });
setExerciseList(searchExercises)
    console.log(searchExercises)
  };
  return (
    <div className="m-2">
      <ExerciseCatergories
        setExerciseList={setExerciseList}
        setLoading={setLoading}
      />
      {/* SEARCH BAR */}
      <div className="w-1/2 flex">
        <MagnifyingGlassCircleIcon className="w-10 h-full fill-inherit" />
        <input
          className="px-2  w-1/2 rounded-2xl bg-[#19192C] text-[#7B7B8F] "
          placeholder="Search for an exercise"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <button onClick={handleClick} className="mx-2">
          Search
        </button>
      </div>
      {/* // TABLE */}
      <table className="table-auto w-full text-white text-justify align-middle">
        <thead>
          <tr className="[&>*]:p-4">
            <th className="w-1/4">Name</th>
            <th>Type</th>
            <th>Equipment</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight(KG)</th>
            <th>Add to Workout</th>
          </tr>
        </thead>

        {!loading &&
          exerciseList.map((exercise) => {
            return (
              <tbody className="even:bg-[#7B7B8F] odd:bg-black ">
                {/* EXERCISE NAME */}
                <tr className="space-y-4 space-x-2 [&>*]:p-4">
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
                      className="w-12 h-12  text-center text-xl text-black bg-slate-400 focus:bg-slate-100"
                      value={exerciseInputs[exercise._id]?.sets ?? 3}
                      name="sets"
                      onChange={handleChange(exercise._id)}
                    ></input>
                  </td>

                  {/* REPS */}

                  <td>
                    <input
                      placeholder="8"
                      className="w-12 h-12 text-center text-xl text-black bg-slate-400 focus:bg-slate-100"
                      value={exerciseInputs[exercise._id]?.reps ?? 8}
                      name="reps"
                      onChange={handleChange(exercise._id)}
                    ></input>
                  </td>

                  {/* WEIGHTS KG */}

                  <td>
                    <input
                      placeholder="10"
                      className="w-12 h-12 text-center text-xl text-black bg-slate-400 focus:bg-slate-100"
                      value={exerciseInputs[exercise._id]?.weight ?? 10}
                      name="weight"
                      onChange={handleChange(exercise._id)}
                    ></input>
                  </td>

                  {/* ADD TO WORKOUT BUTTTON */}

                  <td className="justify-center">
                    <button
                      className="bg-white text-black p-2 h-10 "
                      onClick={() => handleAddToWorkout(exercise._id)}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        {loading && <Loading />}
      </table>
    </div>
  );
}
