import crunch from '../assets/excerciseVideos/crunch.mp4';
import highKnees from '../assets/excerciseVideos/highKnees.mp4';
import jumpingJack from '../assets/excerciseVideos/jumpingJack.mp4';
import lunge from '../assets/excerciseVideos/lunge.mp4';
import plank from '../assets/excerciseVideos/plank.mp4';
import plankLeft from '../assets/excerciseVideos/plankLeft.mp4';
import sidePlankRight from '../assets/excerciseVideos/sidePlankRight.mp4';
import pushupRotation from '../assets/excerciseVideos/pushupRotation.mp4';
import squat from '../assets/excerciseVideos/squat.mp4';
import pushup from '../assets/excerciseVideos/pushup.mp4';
import finished from '../assets/excerciseVideos/finished.mp4';

export const startText = "Get Ready";
export const finishedText = "Congrats! Workout complete!";

export const workoutTitle = {
    "3min":'Short, sweet, sweat',
    "5min":'Full body burner',
    "8min":'Daily intense workout',
}

export const workoutPlans = {
    '3min': [
                [startText, 3],
                ["jumping jacks", 30],
                ["pushups", 30],
                ["squats", 30],
                ["plank", 30],
                ["lunges both sides", 30],
                ["pushup with rotation", 30],
                [finishedText, 5],
            ],
    '5min': [
                [startText, 3],
                ["jumping jacks",30],
                ["rest",5],
                ["pushups",30],
                ["rest",5],
                ["crunches",30],
                ["rest",5],
                ["squats",30],
                ["rest",5],
                ["plank",30],
                ["rest",5],
                ["high knees",30],
                ["rest",5],
                ["lunges both sides",30],
                ["rest",5],
                ["pushup with rotation",30],
                [finishedText, 5],
    ],
    '8min': [
                [startText, 3],
                ["jumping jacks", 30],
                ["rest", 10],
                ["pushups", 30],
                ["rest", 10],
                ["crunches", 30],
                ["rest", 10],
                ["squats", 30],
                ["rest", 10],
                ["plank", 30],
                ["rest", 10],
                ["high knees", 30],
                ["rest", 10],
                ["lunge right", 30],
                ["rest", 10],
                ["lunges left", 30],
                ["rest", 10],
                ["pushup with rotation", 30],
                ["rest", 10],
                ["side plank left", 30],
                ["rest", 10],
                ["side plank right", 30],
                ["rest", 10],
                ["squats", 30],
                [finishedText, 5],
    ],
}

export const videoPerExercise = {
    "jumping jacks":jumpingJack,
    "pushups":pushup,
    "crunches":crunch,
    "squats":squat,
    "plank":plank,
    "high knees": highKnees,
    "lunges both sides": lunge,
    "lunge right": lunge,
    "lunges left": lunge,
    "pushup with rotation": pushupRotation,
    "side plank left": plankLeft,
    "side plank right": sidePlankRight,
    [finishedText]: finished,
}