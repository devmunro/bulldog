import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkoutStats } from "../features/exerciseSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Overview({ user }) {
  const dispatch = useDispatch();

  const { currentWorkout } = useSelector((state) => state.fitness);

  const [chartData, setChartData] = useState({});
  const [exerciseData, setExerciseData] = useState({});

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const res = await dispatch(getUserWorkoutStats(user._id));
        const data = res.payload;
        console.log(data);

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);
        const labels = [...Array(7)].map((_, i) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          return date.toLocaleDateString();
        });

        const totalWeight = labels.map((date) => {
          const workouts = data.filter((workout) => {
            const workoutDate = new Date(
              workout.createdAt
            ).toLocaleDateString();
            return workoutDate === date;
          });

          if (workouts.length > 0) {
            return workouts.reduce((acc, workout) => {
              return (
                acc +
                workout.exercises.reduce((acc2, exercise) => {
                  return (
                    acc2 +
                    exercise.sets.reduce(
                      (setAcc, set) => setAcc + set.weight * set.reps,
                      0
                    )
                  );
                }, 0)
              );
            }, 0);
          } else {
            return null;
          }
        });

        const totalReps = labels.map((date) => {
          const workouts = data.filter((workout) => {
            const workoutDate = new Date(
              workout.createdAt
            ).toLocaleDateString();
            return workoutDate === date;
          });

          if (workouts.length > 0) {
            return workouts.reduce((acc, workout) => {
              return (
                acc +
                workout.exercises.reduce((acc2, exercise) => {
                  return (
                    acc2 +
                    exercise.sets.reduce((setAcc, set) => setAcc + set.reps, 0)
                  );
                }, 0)
              );
            }, 0);
          } else {
            return null;
          }
        });

        // Get the total amount of exercises per name
        const exerciseNames = data
          .map((workout) => workout.exercises)
          .flat()
          .map((exercise) => exercise.name);

        const exerciseCount = {};
        exerciseNames.forEach((name) => {
          exerciseCount[name] = (exerciseCount[name] || 0) + 1;
        });

        setExerciseData({
          labels: Object.keys(exerciseCount),
          datasets: [
            {
              data: Object.values(exerciseCount),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#36EBAF",
                "#AB37EB",
              ],
            },
          ],
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Weight Lifted(KG)",
              data: totalWeight,
              backgroundColor: "#fff",
              borderColor: "#000",
              yAxisID: "y",
            },
            {
              label: "Total Reps Lifted",
              data: totalReps,
              backgroundColor: "#f34",
              borderColor: "#000",
              yAxisID: "y1",
            },
          ],
        });
      }
    };
    getData();
  }, [user, dispatch]);

  return (
    <div className="bg-black h-screen w-full justify-center p-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8 w-full  [&>*]:bg-[#1F2937] [&>*]:lg:p-8 [&>*]:rounded-md [&>*]:shadow-white [&>*]:shadow-lg">
        <div className="grid md:grid-rows-2 text-2xl bg-gradient-to-bl from-blue-700 via-blue-800 to-gray-900 text-white font-extrabold">
          <div>
            <h2 className="text-white p-4 text-md md:text-lg font-bold mb-2 md:mb-8">
              Welcome {user && user.name.toUpperCase()},
              <p className="text-sm">We hope you enjoy your workout!</p>
            </h2>
          </div>

          <div className="space-y-2 bg-black p-4 md:block hidden">
            <h3>Current Workout</h3>
            <h2>{currentWorkout ? currentWorkout.name.toUpperCase() : ""}</h2>
            <button className="btn-primary">START NOW</button>
          </div>
        </div>

        <div className="w-full min-h-48">
          {Object.keys(chartData).length > 0 ? (
            <Bar
              data={chartData}
              options={{
                backgroundColor: "rgba(0, 0, 0, 1)",

                plugins: {
                  title: {
                    display: true,
                    text: "Activity",
                    font: {
                      size: 24,
                      weight: "bold",
                    },
                  },
                },
                scales: {
                  y: {
                    position: "left",
                    title: {
                      display: true,
                      text: "Total Weight Lifted (KG)",
                    },
                  },
                  y1: {
                    position: "right",
                    title: {
                      display: true,
                      text: "Total Reps Lifted",
                    },
                  },
                },
                maintainAspectRatio: true,
                responsive: true,
                aspectRatio: 1,
              }}
            />
          ) : null}
        </div>
        <div className="w-full">
          {Object.keys(exerciseData).length > 0 ? (
            <Doughnut
              data={exerciseData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Type",
                    font: {
                      size: 24,
                      weight: "bold",
                    },
                  },
                },
                maintainAspectRatio: true,
                responsive: true,
                hoverOffset: 20,
                aspectRatio: 1,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
