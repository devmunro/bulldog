import { useState } from "react";
import FirebaseStorage from "../images/firebaseStorage";
import ExerciseCatergories from "./exerciseCatergories";
import Loading from "./Loading";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);

  //
  return (
    <div>
      <ExerciseCatergories
        setExerciseList={setExerciseList}
        setLoading={setLoading}
      />
      <section className="flex flex-wrap max-w-full bg-black">
        {!loading &&
          exerciseList.map((exercise) => {
            return (
              <div className=" w-full flex justify-between text-white bg-[#2B2946] m-2 p-4">
                <ul
                  key={exercise.id}
                  className="text-sm flex-col flex justify-between"
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
                <div className="space-y-4">
                  <FirebaseStorage imageBase={exercise.img} />
                  <button className="bg-white text-black p-2">
                    Add to workout
                  </button>
                </div>
              </div>
            );
          })}
        {loading && <Loading />}
      </section>
    </div>
  );
}
