import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkoutStats } from "../features/exerciseSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

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
          console.log(workouts);
          if (workouts.length > 0) {
            return workouts.reduce((acc, workout) => {
              return (
                acc +
                workout.exercises.reduce((acc2, exercise) => {
                  if (!exercise) {
                    // check if exercise is null
                    return acc2;
                  }
                  console.log(acc2);
                  return (
                    acc2 +
                    exercise.sets.reduce((setAcc, set) => {
                      if (set.weight !== null && set.weight > 0) {
                        console.log("here", set.weight);
                        const amount = setAcc + (set.weight || 0) * set.reps;
                        console.log(amount);
                        return setAcc + (set.weight || 0) * set.reps;
                      } else {
                        return setAcc;
                      }
                    }, 0)
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
                  if (!exercise) {
                    // check if exercise is null
                    return acc2;
                  }
                  return (
                    acc2 +
                    exercise.sets.reduce((setAcc, set) => {
                      if (set.weight === 0 || set.weight === null) {
                        return setAcc + set.reps;
                      } else {
                        return setAcc + set.reps || 0;
                      }
                    }, 0)
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
          .map((exercise) => {
            if (exercise && exercise.name) {
              return exercise.name;
            } else {
              return null; // or return a default value
            }
          })
          .filter((name) => name !== null);

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
        console.log(totalWeight);
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
    <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-4 w-full [&>*]:rounded-xl justify-center p-4">
      <div className="w-full  bg-gray-400">
        <h2 className=" p-4 text-sm md:text-lg font-bold mb-2 md:mb-8">
          Welcome {user && user.name.toUpperCase()},
          <p className="text-sm">We hope you enjoy your workout!</p>
        </h2>
      </div>

      <div className="w-full bg-black">
        {Object.keys(chartData).length > 0 ? (
          <Bar
            className="bg-black"
            data={chartData}
            options={{
              color: "white",
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
                    color: "white",
                  },
                },
                y1: {
                  position: "right",
                  title: {
                    display: true,
                    text: "Total Reps Lifted",
                    color: "white",
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
            className="bg-black"
            data={exerciseData}
            options={{
              color: "white",
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
  );
}
