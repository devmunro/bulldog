import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkoutStats } from "../features/exerciseSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyles.css";

export default function Overview({ user }) {
  const dispatch = useDispatch();

  const { currentWorkout } = useSelector((state) => state.fitness);

  const [chartData, setChartData] = useState({});
  const [exerciseData, setExerciseData] = useState({});

  const [value, onChange] = useState(new Date());

  const tileClassName = ({ date, view }) => {
    // if (view === "month") {
    //   const workoutDay = workouts.find(
    //     (workout) =>
    //       workout.date.getDate() === date.getDate() &&
    //       workout.date.getMonth() === date.getMonth() &&
    //       workout.date.getFullYear() === date.getFullYear()
    //   );
    //   if (workoutDay) {
    //     return "workout-day";
    //   }
    // }
    // return null;
  };

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const res = await dispatch(getUserWorkoutStats(user._id));
        const data = res.payload;
        console.log(data);
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);
        const dateLabels = [...Array(7)].map((_, i) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          return {
            weekday: [
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ][date.getDay()],
            fullDate: date.toLocaleDateString(),
          };
        });
        console.log(dateLabels);

        const totalWeight = dateLabels.map((label) => {
          const workouts = data.filter((workout) => {
            const workoutDate = new Date(
              workout.createdAt
            ).toLocaleDateString();
            return workoutDate === label.fullDate;
          });

          console.log(workouts)

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
                      if (set.weight !== null && set.weight > 0) {
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
        
        const totalReps = dateLabels.map((label) => {
          const workouts = data.filter((workout) => {
            const workoutDate = new Date(
              workout.createdAt
            ).toLocaleDateString();
            return workoutDate === label.fullDate;
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
          labels: dateLabels.map((label) => label.weekday),

          datasets: [
            {
              label: "Total Weight Lifted(KG)",
              data: totalWeight,
              backgroundColor: "white",
              borderColor: "#000",
              yAxisID: "y",
              borderRadius: 10,
            },
            {
              label: "Total Reps Lifted",
              data: totalReps,
              backgroundColor: "gray",
              borderColor: "#000",
              yAxisID: "y1",
              borderSkipped: "middle",
            },
          ],
        });
      }
    };
    getData();
  }, [user, dispatch]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-full [&>*]:rounded-xl justify-center p-4">
      <div className="w-full  bg-gray-400">
        <h2 className=" p-4 text-sm md:text-lg font-bold mb-2 md:mb-8">
          Welcome {user && user.name.toUpperCase()},
          <p className="text-sm">We hope you enjoy your workout!</p>
        </h2>
      </div>

      <div className="w-full bg-black rounded-xl p-2">
        {Object.keys(chartData).length > 0 ? (
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Total Lifted",
                  font: {
                    size: 24,
                    weight: "bold",
                    family: "'Roboto', sans-serif",
                  },
                  color: "white",
                },
                legend: {
                  display: true,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                    color: "rgba(255, 255, 255, 0.1)",
                  },
                  ticks: {
                    color: "white",
                    font: {
                      family: "'Roboto', sans-serif",
                    },
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
                y: {
                  position: "left",
                  title: {
                    display: true,
                    text: "Total Weight (KG)",
                    color: "white",
                    font: {
                      family: "'Roboto', sans-serif",
                    },
                  },
                  grid: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.1)",
                  },
                  ticks: {
                    color: "white",
                    font: {
                      family: "'Roboto', sans-serif",
                    },
                  },
                },
                y1: {
                  position: "right",
                  title: {
                    display: true,
                    text: "Total Reps",
                    color: "white",
                    font: {
                      family: "'Roboto', sans-serif",
                    },
                  },
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "white",
                    font: {
                      family: "'Roboto', sans-serif",
                    },
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

      <div className="w-full bg-black rounded-xl p-2">
        {Object.keys(exerciseData).length > 0 ? (
          <Doughnut
            data={exerciseData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Exercise Types",
                  font: {
                    size: 24,
                    weight: "bold",
                    family: "'Roboto', sans-serif",
                  },
                  color: "white",
                },
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    color: "white",
                    font: {
                      family: "'Roboto', sans-serif",
                    },
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
      <div className="w-full bg-black flex flex-col items-center p-4">
        <h2 className="text-white font-semibold text-xl mb-4">Activity</h2>
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          disabled={true}
        />
      </div>
    </div>
  );
}
