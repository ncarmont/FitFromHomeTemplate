import React, {useState} from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View, Platform} from 'react-native';
import { Video } from 'expo-av';
import { workoutPlans, startText, finishedText, workoutTitle, videoPerExercise} from './WorkoutParameters.js';
import '@expo/match-media'
// Unleash the demo :D
import { useMediaQuery } from "react-responsive";

export default function WorkoutStages(setWorkoutType, workoutType, setCurrentStageNumber, currentStageNumber,
    timeLeft, setTimeLeft, intervalId, isPhone) {  

    const workoutSelected = workoutPlans[workoutType];

    if(currentStageNumber < 0){
        setTimeLeft(workoutSelected[0][1])
        setCurrentStageNumber(currentStageNumber+1);
        return <Text>Loading</Text>
    };

    const amountOfExercises = getAmountOfExercisesTillNow(workoutSelected, workoutSelected.length);
    const amountOfExercisesTillNow = getAmountOfExercisesTillNow(workoutSelected, currentStageNumber+1);

    if (currentStageNumber === workoutSelected.length){
        return finishWorkout(setWorkoutType, setCurrentStageNumber, intervalId)
    }

    const exerciseTime = workoutSelected[currentStageNumber][1];
    const exerciseName = workoutSelected[currentStageNumber][0];

    if(timeLeft <= 0){
        if(currentStageNumber >= 0){
            nextExercise(currentStageNumber, setCurrentStageNumber, workoutSelected,
                 setTimeLeft, exerciseTime);
        }   
    }

    return (
        <View style={[styles.containerWorkout, { transform: [{ scale: isPhone? 1 : (Platform.isPad ? 1.8 : 1.2) }] }]}>
        <View style={{width: '100%', height:'100%', maxWidth: 400,  alignSelf: 'center', alignItems: 'center', maxHeight: 700}}>

        <View style={{position: 'absolute', top: 10, left: 5}}>
        <Text style={styles.headerText} >{exerciseName} </Text>
        <Text style={styles.headerSubtitle} >{exerciseName === startText ? "workout starts in..." : 
            (exerciseName === finishedText? "you are awesome!" :  
            ( exerciseName === "rest" ? "Catch your breath" : "As many as you can!")) }</Text>
        </View>

    {/* isExercise(exerciseName) || exerciseName == finishedText?  null : <View style={{height: 90}}></View> */}
        <Text style={styles.timeLeft}>{timeLeft}s</Text>
        { isExercise(exerciseName) || exerciseName == finishedText? 
        <Video
            source={videoPerExercise[exerciseName]}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 340, height: Platform.OS!=="web"? 210 : 190, marginLeft: 0, borderRadius:20, marginTop: 20}}
        />
        : <View style={{height: 230}}></View> }

        <View style={styles.controls}>

        { renderPreviousButton(currentStageNumber, setCurrentStageNumber, workoutSelected, 
            setTimeLeft, exerciseTime) }
        
        <TouchableOpacity style={styles.next}
            onPress={() =>  nextExercise(currentStageNumber, setCurrentStageNumber, workoutSelected,
                 setTimeLeft, exerciseTime)}>
            <Text style={styles.nextText} >Next</Text>
        </TouchableOpacity>
        </View>

        <Text style={styles.excercisesCompleted}>{amountOfExercisesTillNow}/{amountOfExercises} exercises completed</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => finishWorkout(setWorkoutType, setCurrentStageNumber, intervalId )}>
             <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        
        </View>   
      </View>   
    )
}

const renderPreviousButton  = (currentStageNumber, setCurrentStageNumber, workoutSelected, 
    setTimeLeft, exerciseTime) => {
        return <TouchableOpacity style={styles.previous}
                onPress={() => {
                    if (currentStageNumber > 0){

                        previousExercise(currentStageNumber, setCurrentStageNumber, workoutSelected,
                        setTimeLeft, exerciseTime) 
                    }
                }} >
                    <Text style={styles.previousText}>Previous</Text>
                </TouchableOpacity>
}

const isExercise = (exercise) => {
    if(exercise === "rest" || exercise === startText || exercise === finishedText){
        return false
    }
    return true
}

const finishWorkout = (setWorkoutType, setCurrentStageNumber, intervalId ) =>{
    setWorkoutType('');
    setCurrentStageNumber(-1);
    clearInterval(intervalId)
    return <Text>Congrats on finishing!</Text>
}

const nextExercise = (currentStageNumber, setCurrentStageNumber, workoutSelected, setTimeLeft, exerciseTime) => {
        setCurrentStageNumber(currentStageNumber+1);
    if (currentStageNumber + 1 !== workoutSelected.length){
        const nextExerciseTime = workoutSelected[currentStageNumber+1][1];
        setTimeLeft(nextExerciseTime);
    }
}

const previousExercise = (currentStageNumber, setCurrentStageNumber, workoutSelected, setTimeLeft, exerciseTime) => {
    if(currentStageNumber > 0 ){
        setCurrentStageNumber(currentStageNumber-1);
        const prevExerciseTime = workoutSelected[currentStageNumber-1][1];
        setTimeLeft(prevExerciseTime);
    }
}

const getAmountOfExercisesTillNow = (workoutSelected, index) => {
    workoutSelected = workoutSelected.slice(0,index);
    let amountOfRests = 0;
    for (const exercise of workoutSelected){
        if(!isExercise(exercise[0])){
            amountOfRests+=1;
        }
    }
    return  workoutSelected.length - amountOfRests;
}

const styles = StyleSheet.create({

    containerWorkout: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
        backgroundColor: '#2980B9',
        textAlign: 'center',
        // flexDirection:'column',
        // flexWrap:'wrap',
        height: '100%',
        width: '100%',
        alignSelf: 'center',
      }, 
    controls :{
        width: 400,
        paddingTop: 20,
        paddingLeft: 80,
        paddingRight: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    next :{
        color: 'white',
    },
    excercisesCompleted:{
        color:'white',
        textAlign :'center',
        width: '100%',
        marginTop: 140,
        fontSize: 16,
        position: 'absolute',
        top: 360,

    },
    nextText :{
        color: 'white',
    },
    previous :{
        // flex: 1,
        color: 'white',
    },
    previousText :{
        color: 'white',
    },
    
    back:{
        textAlign: 'center',
        color: 'white',
        fontSize: 11,
    },
    backButton :{
        width: '100%',
        position: 'absolute',
        fontSize: 12,
        textAlign: 'center',
        bottom: 40,
    },
    container: {
        flex: 1, 
        backgroundColor: '#2980B9',
        alignSelf: 'stretch',
        textAlign: 'center',
        flexDirection:'column',
        flexWrap:'wrap',
      },
      timeLeft:{
          color:'white',
          fontSize: 40,
          textAlign: 'center',
          width: '100%',
          marginTop: 140,
      },
      headerText: {
        textAlign:'left',
        width: '100%',
        marginLeft: 34,
        marginTop: 35,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 34,
        color: '#FFFFFF',
      }, 
      headerSubtitle:{
        textAlign:'left',
        width: 248,
        marginLeft: 34,
        marginTop: 5,
        fontStyle: 'normal',
        fontWeight: "300",
        fontSize: 20,
        color: '#FFFFFF',
      }, 
})