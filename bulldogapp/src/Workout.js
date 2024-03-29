import React, {useState, useEffect} from 'react';
import {clearState, loginUser} from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {completeWorkout} from './features/exerciseSlice';

export default function Workout() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const {currentWorkout} = useSelector(state => state.fitness);
  const {user} = useSelector(state => state.auth);
  const currentExercise = currentWorkout?.exercises;
  const exerciseID = currentExercise?.[currentExerciseIndex]?.exercise;
  const exerciseName = currentExercise?.[currentExerciseIndex]?.name;
  const exerciseSets = currentExercise?.[currentExerciseIndex]?.sets;
  const exerciseReps = currentExercise?.[currentExerciseIndex]?.reps;
  const exerciseWeight = currentExercise?.[currentExerciseIndex]?.weight;
  const exerciseImage = currentExercise?.[currentExerciseIndex]?.img;

  const [showTimer, setShowTimer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [currentSet, setCurrentSet] = useState(0);
  const [completedWorkout, setCompletedWorkout] = useState(false);
  //exerciseWorkoutdata

  const [exerciseData, setExerciseData] = useState([
    {
      id: '',
      name: '',
      sets: [{reps: '', weight: '', completed: false}],
    },
  ]);

  const dispatch = useDispatch();

  //handle inputs

  const handleInputChange = (id, name) => text => {
    setExerciseData(prevState => {
      const updatedExercise = {
        id: exerciseID,
        name: exerciseName,
        sets: prevState[currentExerciseIndex]?.sets || [
          {reps: exerciseReps, weight: exerciseWeight, completed: false},
        ],
      };
      updatedExercise.sets[id] = {
        ...updatedExercise.sets[id],
        [name]: text,
      };
      const newState = [...prevState];
      newState[currentExerciseIndex] = updatedExercise;
      return newState;
    });
  };

  console.log(exerciseData);

  const handleDone = rowIndex => e => {
    e.preventDefault();

    const repsValue = exerciseData[currentExerciseIndex]?.sets[rowIndex]?.reps;
    const weightValue =
      exerciseData[currentExerciseIndex]?.sets[rowIndex]?.weight;

    if (!repsValue || !weightValue) {
      alert('complete all fields');
      return;
    }

    const updatedSets = [...exerciseData[currentExerciseIndex].sets];
    updatedSets[rowIndex].completed = true;
    setExerciseData(prevState => {
      const updatedExercise = {
        ...prevState[currentExerciseIndex],
        sets: updatedSets,
      };
      const newState = [...prevState];
      newState[currentExerciseIndex] = updatedExercise;
      return newState;
    });

    setSecondsLeft(5);
    setShowTimer(true);
    setCurrentSet(currentSet + 1);
  };

  const setAmount = [];
  for (let i = 0; i < exerciseSets; i++) {
    const set = exerciseData[currentExerciseIndex]?.sets[i];
    const repsValue = set?.reps;
    const weightValue = set?.weight;
    const completed = set?.completed;

    setAmount.push(
      <View key={i} style={styles.container}>
        <Text style={styles.exerciseName}>Set {i + 1}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={`${exerciseReps}`}
            keyboardType="number-pad"
            name="reps"
            value={repsValue || ''}
            onChangeText={text => handleInputChange(i, 'reps')(text)}
            editable={!completed && currentSet === i}
            style={[
              styles.input,
              !completed && currentSet === i
                ? styles.inputEditable
                : styles.inputNonEditable,
            ]}
          />
          <TextInput
            placeholder={`${exerciseWeight}kg`}
            keyboardType="decimal-pad"
            name="weight"
            value={weightValue || ''}
            onChangeText={text => handleInputChange(i, 'weight')(text)}
            editable={!completed && currentSet === i}
            style={[
              styles.input,
              !completed && currentSet === i
                ? styles.inputEditable
                : styles.inputNonEditable,
            ]}
          />
          <TouchableOpacity
            onPress={handleDone(i)}
            disabled={completed || currentSet !== i}
            style={
              completed || currentSet !== i
                ? styles.buttonDisabled
                : styles.button
            }>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>,
    );
  }

  // be able to change to next exercise
  const handleNextExercise = () => {
    const newNumber = currentExerciseIndex + 1;
    console.log(newNumber);
    if (newNumber === currentExercise.length) {
      return;
    }

    setCurrentExerciseIndex(newNumber);

    if (!exerciseData[newNumber]) {
      setCurrentSet(0);
      return;
    }
    const completedSets = exerciseData[newNumber].sets.filter(
      word => word.completed === true,
    );
    setCurrentSet(completedSets.length);
  };

  // be able to change to prev exercise
  const handlePrevExercise = () => {
    const newNumber = currentExerciseIndex - 1;
    console.log(newNumber);
    if (newNumber === -1) {
      return;
    }
    setCurrentExerciseIndex(newNumber);

    console.log(exerciseData[newNumber]);
    if (
      !exerciseData[newNumber] ||
      exerciseData[newNumber].sets[0].completed === false
    ) {
      setCurrentSet(0);
      return;
    }
    const completedSets = exerciseData[newNumber].sets.filter(
      word => word.completed === true,
    );
    setCurrentSet(completedSets.length);
  };

  //complee workout

  const handleCompleteWorkout = async e => {
    e.preventDefault();

    // if () {
    //   alert("Please complete all exercise sets before completing the workout.");
    //   return;
    // }

    const workoutResults = {
      userID: user._id,
      workoutID: currentWorkout._id,
      workoutName: currentWorkout.name,
      exercises: exerciseData,
    };

    const res = await dispatch(completeWorkout(workoutResults));

    setCompletedWorkout(true);
  };

  useEffect(() => {
    let timerId;
    if (showTimer && secondsLeft > 0) {
      timerId = setTimeout(() => {
        setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [showTimer, secondsLeft]);

  //TOTAL WEIGHT LIFTED:

  console.log(exerciseSets);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{currentWorkout.name}</Text>

      {/* NO WORKOUT SECTION */}
      {!currentWorkout && <Text>Loading...</Text>}
      {currentWorkout?.exercises?.length === 0 && (
        <View style={styles.noExercises}>
          <Text>No Exercises found, please add exercises to start</Text>
          {/* Replace the following line with a react-navigation link */}
          <Text style={styles.link}>Click Here to Start</Text>
        </View>
      )}

      {/* WORKOUT SECTION */}
      {currentWorkout.exercises.length > 0 && !completedWorkout && (
        <View>
          <View style={styles.workoutForm}>
            <View style={styles.exerciseImageContainer}>
              <Image
                style={{width: 200, height: 100}}
                source={{uri: exerciseImage}}
              />
              <Text style={styles.exerciseName}>{exerciseName}</Text>
            </View>
            {setAmount}
            {showTimer && (
              <View style={styles.timerOverlay}>
                <View style={styles.timerBackground} />
                <View style={styles.timerContainer}>
                  {showTimer && secondsLeft !== 0 && (
                    <View style={styles.timer}>
                      <Text style={styles.restText}>REST</Text>
                      <Text style={styles.timerText}>{secondsLeft} secs</Text>
                    </View>
                  )}
                  {showTimer && secondsLeft === 0 && (
                    <View style={styles.timer}>
                      <Text style={styles.timesUpText}>Time's up!</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setShowTimer(false);
                        }}
                        style={styles.nextSetButton}>
                        <Text style={styles.nextSetText}>NEXT SET</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowTimer(false);
                setSecondsLeft(45);
                handlePrevExercise();
              }}
              style={[
                styles.button,
                showTimer && secondsLeft > 0 && styles.hidden,
              ]}>
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableOpacity>
            {currentSet === exerciseSets && (
            <TouchableOpacity
              onPress={handleCompleteWorkout}
              style={styles.completeButton}>
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
            <TouchableOpacity
              onPress={() => {
                setShowTimer(false);
                setSecondsLeft(45);
                handleNextExercise();
              }}
              style={[
                styles.button,
                showTimer && secondsLeft > 0 && styles.hidden,
              ]}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      )}

      {completedWorkout && (
        <View style={styles.workoutCompleted}>
          <Text style={styles.boldText}>WORKOUT COMPLETED</Text>
          <Text>Well Done {user.name}</Text>
          <Text style={styles.fontSemiBold}>
            Total of Exercises Completed = {exerciseData.length}
          </Text>
          {exerciseData.map(exercise => {
            let totalWeight = 0;
            let totalReps = 0;
            exercise.sets.forEach(set => {
              if (set.completed) {
                totalWeight += set.weight * set.reps;
                totalReps += parseInt(set.reps);
              }
            });
            return (
              <View key={exercise._id}>
                <Text style={styles.fontSemiBold}>
                  {exercise.name}: {totalWeight} kg, {totalReps} reps
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 4,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  header: {
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: 4,
    padding: 8,
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
  },
  noExercises: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  exerciseImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: "white",
  },

  workoutForm: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    alignSelf: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    color: "white",
  },
  // ...button styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  button: {
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
  },

  completeButton: {
    backgroundColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    
  },


  // ...other styles
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  inputEditable: {
    backgroundColor: 'white',
  },
  inputNonEditable: {
    backgroundColor: '#f0f0f0',
  },

  //timer styles

  timerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  timerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.8,
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingHorizontal: 32,
    fontSize: 32,
    backgroundColor: 'black',
    fontWeight: 'bold',
  },
  timer: {
    textAlign: 'center',
    marginVertical: 16,
  },
  restText: {
    fontWeight: 'bold',
    color: 'red',
  },
  timerText: {
    color: 'red',
  },
  timesUpText: {
    color: 'red',
  },
  nextSetButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nextSetText: {
    color: 'white',
  },
});
