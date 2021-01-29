import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, FlatList, SafeAreaView,  Button, Platform , Linking} from 'react-native';
import girlWorkout from './assets/girlWorkout.jpg';
import pushup from './assets/pushup.jpg';
import squat from './assets/squat.jpg';
import WorkoutCard from './components/WorkoutCard';
import WorkoutStages from './components/WorkoutStages'
import logo from './assets/icon.png';
import '@expo/match-media'
// Unleash the demo :D
import { useMediaQuery } from "react-responsive";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
 } from 'expo-ads-admob';



export default function App() {

  const isPhone = useMediaQuery({    
    maxDeviceWidth: 650
  })
 
  const bannerError = () => {
      console.log('banner ad not loading')
    }
  const bannerAdReceived = () => {
      console.log('banner ad received')
    }

  const [workoutType, setWorkoutType] = useState('');
  const [currentStageNumber, setCurrentStageNumber ] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {

  //   // exit early when we reach 0

  //   // save intervalId to clear the interval when the
  //   // component re-renders
    const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    });

  const intervalId = 0;

  const workouts = [
    {
      title:'Short, sweet, sweat',
      time: 3,
      image: girlWorkout,
      onPress: () =>{ console.log("working"); setWorkoutType('3min') },
    },
    {
      title:'Full body burner',
      time: 5,
      image: pushup,
      onPress: () =>{ setWorkoutType('5min') },
    },
    {
      title:'Daily intense workout',
      time: 8,
      image: squat, 
      onPress: () =>{ setWorkoutType('8min') },
    },
  ]

  if(workoutType !== ''){
    return WorkoutStages(setWorkoutType, workoutType, setCurrentStageNumber, currentStageNumber, 
      timeLeft, setTimeLeft, intervalId, isPhone);
  }

  return (

    <View style={[styles.container, { transform: [{ scale: isPhone? 1 : (Platform.isPad ? 1.8 : 1.1) }] }]}>
    <View style={{width: '100%', maxWidth: 400, marginTop: 20,  maxHeight: 700,  alignSelf: 'center' }}>
    <Image source={logo} style={{width: 60, height: 60, position: 'absolute', top: 30, right: 40,}} />
      <Text style={styles.headerText} >Home Workouts </Text>
      <Text style={styles.headerSubtitle} >backed by science </Text>
      <Text style={styles.textAboveWorkouts} >no equipment needed </Text>
      <FlatList
      data={workouts}
      renderItem={WorkoutCard}
      keyExtractor={item => item.title}
    /> 

    <TouchableOpacity 
    onPress={() => {Linking.openURL("https://www.notion.so/ncarmont/Fit-From-Home-Documents-2ee7d9d7c3d2438c8b6ef52a24ce8700")}} >
    <Text style={{color: 'white', fontSize: 10, textAlign: 'center', margin: 15,}}>
    By using this app you agree to our medical disclaimer, terms of use & privacy policy here.
    </Text>
    </TouchableOpacity>


    { /*Platform.OS !== 'web' ?
    <AdMobBanner style={styles.bannerAd}
      bannerSize="fullBanner"
      adUnitID="ca-app-pub-3940256099942544/6300978111"
      onDidFailToReceiveAdWithError={bannerError}
      onAdViewDidReceiveAd = {bannerAdReceived} />

  : null */}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1, 
    backgroundColor: '#2980B9',
    textAlign: 'center',
    // flexDirection:'column',
    // flexWrap:'wrap',
    height: '100%',
    alignItems: 'center',

    
  }, 
  bannerAd:{
    width: '100%',
    paddingLeft: 0,
    marginLeft: 0,
  },
  headerText: {
    textAlign: 'left',
    width: 234,
    marginLeft: 34,
    marginTop: 35,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    color: '#FFFFFF',
  }, 
  headerSubtitle:{
    textAlign: 'left',
    width: 248,
    marginLeft: 34,
    marginTop: 0,
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 20,
    color: '#FFFFFF',
  }, 
  textAboveWorkouts:{
    width: '100%',
    marginLeft: 34,
    marginTop: 5,
    marginBottom: 10,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'left',
    color: '#FFFFFF',
  },

});
