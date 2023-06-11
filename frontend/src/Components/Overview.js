import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkoutStats } from "../features/exerciseSlice";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyles.css";
import Loading from "./Loading";
import { getBodyWeight, recordAdded } from "../features/bodySlice";
import { showModal } from "../features/modalSlice";
import ModalRoot from "./Modals/ModalBase";

export default function Overview({ user }) {
  const dispatch = useDispatch();

  const { bodyWeight } = useSelector((state) => state.body);
  const refresh = useSelector((state) => state.body.refresh); // get the refresh state


  const [chartData, setChartData] = useState({});
  const [weightChartData, setWeightChartData] = useState({});
  const [exerciseData, setExerciseData] = useState({});

  

  useEffect(() => {
    const getBodyWeightData = async () => {
      const res = await dispatch(getBodyWeight(user._id));
      let data = [...res.payload];
  
      // Sort the data by date in ascending order
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  
      // Create a complete date range for the last 5 days
      const dateRange = Array.from({ length: 10 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return `${d.getMonth()+1}/${d.getDate()}`;
      }).reverse();
  
      // Prepare labels and weight data
      const dateLabels = dateRange;
      const weightData = dateLabels.map(label => {
        const item = data.find(d => {
          const date = new Date(d.createdAt);
          return `${date.getMonth()+1}/${date.getDate()}` === label;
        });
        return item ? item.weight : null;
      });
  

      // Set the chart data
      setWeightChartData({
        labels: dateLabels,
        datasets: [
          {
            label: "Weight (kg)",
            data: weightData,
            fill: false,
            backgroundColor: "#BFDBFE",
            borderColor: "#BFDBFE",
            tension: 0.3,
            pointBackgroundColor: "black",
            spanGaps: true
          },
        ],
      });
    };
   
    getBodyWeightData();
    
  }, [dispatch, user._id,refresh]);

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

  //BODYUPDATEMODAL
  const handleBodyUpdate = () => {
    dispatch(showModal({ modalType: "bodyUpdate", modalProps: {} }));
  };

  return (
    <>
      {!chartData && <Loading />}
      {chartData && (
        <div className="w-full defaultFont">
          <div className="md:w-full">
            <h2 className=" pb-4 sub-heading ">Overview</h2>
          </div>
          <div className="lg:flex w-full md:gap-8  md:p-4">
            <div className=" bg-primary text-white rounded-xl flex flex-col items-center lg:p-8 p-4 m-2 lg:space-y-12 space-y-4">
              <img
                alt="avatar"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/avatar-bg.png"
                className="shadow-2xl rounded-full"
              />
              <p>Welcome {user.name}</p>

              <div>
                <ul className="flex  md:gap-4 gap-2  text-tertiary [&>*]:bg-white [&>*]:rounded-xl [&>*]:shadow-2xl text-center md:[&>*]:w-[75px]">
                  <li className="group relative md:p-4 p-2 hover:scale-125">
                    <p className="font-semibold">27</p>
                    <p className="text-primary">Age</p>
                  </li>
                  <li className="group relative  md:p-4 p-2 hover:scale-125">
                    <p className="font-semibold">77</p>
                    <p className="text-primary">Weight</p>
                  </li>
                  <li className="group relative  md:p-4 p-2 hover:scale-125">
                    <p className="font-semibold">123</p>
                    <p className="text-primary">Height</p>
                  </li>
                </ul>
                <div className="flex justify-center m-4">
                  <button onClick={handleBodyUpdate} className="btn-tertiary">
                    Update
                  </button>
                </div>
              </div>
              <div className="md:p-12 p-4 hidden lg:block bg-white text-tertiary rounded-xl font-semibold">
                CHATGPT FEATURE COMING SOON!
              </div>
            </div>

            <div className="md:w-full md:grid  grid-cols-2 md:[&>*]:h-80 [&>*]:h-80 md:gap-2 [&>*]:my-2 ">
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
                {Object.keys(weightChartData).length > 0 && (
                  <Line
                    data={weightChartData}
                    options={{
                      plugins: {
                        color: "black",
                        title: {
                          display: true,
                          text: "Body Weight",
                          font: {
                            size: 24,
                            weight: "bold",
                            family: "'Roboto', sans-serif",
                          },
                          color: "black",
                        },
                        legend: {
                          display: true,
                          color: "black",
                        },
                      },
                      scales: {
                        color: "black",
                        x: {
                          ticks: {
                            color: "black",
                            font: {
                              family: "'Roboto', sans-serif",
                            },
                          },
                        },
                        y: {
                          position: "left",
                          title: {
                            display: true,
                            text: "Weight (KG)",
                            color: "black",
                            font: {
                              family: "'Roboto', sans-serif",
                            },
                          },
                          grid: {
                            display: true,
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                          ticks: {
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
                )}
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
          </div>
        </div>
      )}
      <ModalRoot />
    </>
  );
}
