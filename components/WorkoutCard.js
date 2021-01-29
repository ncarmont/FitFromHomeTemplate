import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function WorkoutCard({item} ) {
    const {title, time, image, onPress} = item;
    return (
        <TouchableOpacity key={title} style={styles.workoutCard} onPress={onPress}>
        <ImageBackground   imageStyle={{ borderRadius: 20}}
         source={image} style={styles.image}>
            <View style={styles.workoutCardTextContainer}>
            <Text style={styles.workoutTitle}>{title}</Text>
            <Text style={styles.workoutTime}>{time} min ▶</Text>
            </View>
        </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    workoutCard: {
        width: '75%',
        height: 140,
        marginLeft: 34,
        marginTop: 10,
        backgroundColor: '#3498DB',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,    
        borderRadius: 20,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius: 20,
      },

      workoutCardTextContainer: {
        width: 200,
        height: 70,
        marginLeft: 50,
        marginTop: 10,
        backgroundColor: 'rgba(41, 128, 185, 0.9)',
        borderRadius: 20,
      }, 
      workoutTitle: {
          marginTop: 15,
          width: '100%',
          textAlign: 'center',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 16,
          color: 'white',
      },
      workoutTime: {
        color: 'white',
        marginTop: 5,
        width: '100%',
        textAlign: 'center',
        fontSize: 15,
      }
      
})