import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkoutStats } from "../features/exerciseSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyles.css";
import Loading from "./Loading";

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
        const dateLabels = [...Array(7)].map((_, i) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          return {
            weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
              date.getDay()
            ],
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

              backgroundColor: ["#BFDBFE", "#4F46E5", "#000000", "#fff"],
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
              backgroundColor: "#4F46E5",
              borderColor: "#000",
              yAxisID: "y",
              borderRadius: 10,
            },
            {
              label: "Total Reps Lifted",
              data: totalReps,
              backgroundColor: "#BFDBFE",
              textcolor: "black",
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
    <>
    {!chartData && <Loading/>}
    {chartData && (
    <div className="w-full h-full ">
      <div className="w-full">
        <h2 className=" pb-4 text-sm md:text-lg font-bold ">Overview</h2>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-8 h-[90%]  ">
        <div className="row-span-2 bg-primary text-white rounded-xl flex flex-col items-center p-8 space-y-16 h-full">
          <img
            alt="avatar"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/avatar-bg.png"
            className="shadow-2xl rounded-full"
          />
          <p>Welcome {user.name}</p>

          <ul className="flex gap-4 flex- text-tertiary [&>*]:bg-white [&>*]:rounded-xl [&>*]:shadow-2xl text-center [&>*]:w-[75px]">
            <li className="p-4 ">
              <p className="font-semibold">27</p>
              <p className="text-primary">Age</p>
            </li>
            <li className="p-4">
              <p className="font-semibold">77</p>
              <p className="text-primary">Weight</p>
            </li>
            <li className="p-4">
              <p className="font-semibold">123</p>
              <p className="text-primary">Height</p>
            </li>
          </ul>

          <div className="p-12 bg-white text-tertiary my-16 rounded-xl font-semibold">CHATGPT FEATURE COMING SOON!</div>
        </div>

        <div className="w-full bg-white rounded-xl ">
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
                  },
                  legend: {
                    display: true,
                  },
                },
                scales: {
                  x: {
                    
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

                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                    grid: {
                      display: true,
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: {
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

                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                   
                    ticks: {
                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 1,
              }}
            />
          ) : null}
        </div>

        <div className="w-full bg-white rounded-xl ">
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
                    color: "black",
                  },
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      color: "black",
                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 1,
              }}
            />
          ) : null}
        </div>
        <div className="w-full bg-white rounded-xl ">
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
                  },
                  legend: {
                    display: true,
                  },
                },
                scales: {
                  x: {
                    
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

                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                    grid: {
                      display: true,
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: {
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

                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                    
                    ticks: {
                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 1,
              }}
            />
          ) : null}
        </div>

        <div className="w-full bg-white rounded-xl ">
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
                    color: "black",
                  },
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      color: "black",
                      font: {
                        family: "'Roboto', sans-serif",
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 1,
              }}
            />
          ) : null}
        </div>
      </div>
    </div> )}
    </>
  );
}
