import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkoutStats } from "../features/exerciseSlice";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Overview() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userID = user._id;
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(getUserWorkoutStats(userID));
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
          const workoutDate = new Date(workout.createdAt).toLocaleDateString();
          return workoutDate === date;
        });
      
        if (workouts.length > 0) {
          return workouts.reduce((acc, workout) => {
            return acc + workout.exercises.reduce((acc2, exercise) => {
              return (
                acc2 +
                exercise.sets.reduce(
                  (setAcc, set) => setAcc + set.weight * set.reps,
                  0
                )
              );
            }, 0);
          }, 0);
        } else {
          return null;
        }
      });

      const totalReps = labels.map((date) => {
        const workouts = data.filter((workout) => {
          const workoutDate = new Date(workout.createdAt).toLocaleDateString();
          return workoutDate === date;
        });
      
        if (workouts.length > 0) {
          return workouts.reduce((acc, workout) => {
            return acc + workout.exercises.reduce((acc2, exercise) => {
              return acc2 + exercise.sets.reduce((setAcc, set) => setAcc + set.reps, 0);
            }, 0);
          }, 0);
        } else {
          return null;
        }
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
    };
    if (user) {
      getData();
    }
  }, [dispatch, userID, user]);

  return (
    <div className="bg-black h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
        Welcome {user.name}, we hope you enjoy your workout!
      </h2>
      <div className="w-11/12 h-96 md:w-3/4 md:h-3/4">
        {Object.keys(chartData).length > 0 ? (
          <Bar
            data={chartData}
            options={{
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
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
