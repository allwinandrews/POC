import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';

import AppLayout from '../components/layout/AppLayout';

export default function HomeScreen(props) {
  const [state, setState] = useState({
    stopwatchStart: false,
    stopwatchReset: false,
  });
  const [currentTime, setCurrentTime] = useState('');
  const [showTime, setShowTime] = useState('');

  function toggleStopwatch() {
    const data = {
      stopwatchStart: !stopwatchStart,
      stopwatchReset: false,
    };
    setState(data);
    setShowTime(currentTime);
  }

  function getFormattedTime(time) {
    setCurrentTime(time);
  }

  const options = {
    container: {
      backgroundColor: '#000',
      padding: 5,
      borderRadius: 5,
      width: 220,
    },
    text: {
      fontSize: 30,
      color: '#FFF',
      marginLeft: 7,
    },
  };

  const {stopwatchStart, stopwatchReset} = state;
  const {container, center, buttonContainer, buttonText, showtime} = styles;
  const {navigation} = props;

  return (
    <>
      <SafeAreaView style={container}>
        <View style={center}>
          <Stopwatch
            laps
            msecs
            start={stopwatchStart}
            reset={stopwatchReset}
            options={options}
            getTime={getFormattedTime}
          />
        </View>
        <TouchableOpacity style={buttonContainer} onPress={toggleStopwatch}>
          <Text style={buttonText}>
            {!stopwatchStart ? 'Check In' : 'Check Out'}
          </Text>
        </TouchableOpacity>
        <View style={center}>
          <Text style={showtime}>{showTime}</Text>
        </View>
      </SafeAreaView>
      <AppLayout navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  center: {alignItems: 'center'},
  showtime: {color: '#fff', paddingTop: '40%', fontSize: 50},
  container: {
    padding: 20,
    height: 674,
    backgroundColor: 'black',
    paddingTop: '55%',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
