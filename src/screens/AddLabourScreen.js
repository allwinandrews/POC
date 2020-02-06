import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import RNLocation from 'react-native-location';
import firebase from 'react-native-firebase';

import AppLayout from '../components/layout/AppLayout';

export default function AddLabourScreen({navigation}) {
  const [location, setLocation] = useState({});
  const initialState = {
    startTime: '00:00',
    endTime: '00:00',
    unionCode: '1',
    taskId: '',
    taskDescription: '',
    location: '',
  };
  const [state, setState] = useState(initialState);
  const [startHours, setStartHours] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [startMins, setStartMins] = useState(0);
  const [endMins, setEndMins] = useState(0);
  const [date, setDate] = useState(0);

  const {
    buttonText,
    buttonContainer,
    textArea,
    view,
    input,
    container,
  } = styles;

  function handleChange(name, value) {
    const data = {
      ...state,
      [name]: value,
    };
    setState(data);
  }

  function firstTimePicker(hours, mins) {
    setStartHours(hours);
    setStartMins(mins);
    handleChange(
      'startTime',
      `${hours > 9 ? hours : '0' + hours}:${mins > 9 ? mins : '0' + mins}`,
    );
  }

  function secondTimePicker(hours, mins) {
    setEndHours(hours);
    setEndMins(mins);
    handleChange(
      'endTime',
      `${hours > 9 ? hours : '0' + hours}:${mins > 9 ? mins : '0' + mins}`,
    );
  }

  function handleSubmit() {
    const ref = firebase.firestore().collection(date);
    ref.add(state);
    setStartHours(0);
    setStartMins(0);
    setEndHours(0);
    setEndMins(0);
    const data = {...initialState, location};
    setState(data);
    navigation.navigate('Edit Labour', data);
  }

  useEffect(() => {
    var date = new Date().getDate(),
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear();
    const refDate = date + '-' + month + '-' + year;
    setDate(refDate);
    // const ref = firebase.firestore().collection(refDate);
    // ref.onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     console.log(doc.data());
    //   });
    // });
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates(locations => {
          const data = {
            ...state,
            location: locations[0],
          };
          setLocation(locations[0]);
          setState(data);
        });
      }
    });
  }, []);

  const {taskDescription, taskId, unionCode} = state;
  return (
    <>
      <SafeAreaView style={container}>
        <View style={view}>
          <Text>Start Time</Text>
          <TimePicker
            selectedHours={startHours}
            selectedMinutes={startMins}
            onChange={firstTimePicker}
          />
        </View>
        <View style={view}>
          <Text>End Time</Text>
          <TimePicker
            selectedHours={endHours}
            selectedMinutes={endMins}
            onChange={secondTimePicker}
          />
        </View>
        <View style={view}>
          <Picker
            selectedValue={unionCode}
            onValueChange={value => {
              handleChange('unionCode', value);
            }}>
            <Picker.Item label="CODE 1" value="1" />
            <Picker.Item label="CODE 2" value="2" />
          </Picker>
        </View>
        <TextInput
          style={input}
          onChangeText={event => handleChange('taskId', event)}
          value={taskId}
          placeholder="Task ID"
          placeholderTextColor="rgba(225,225,225,0.7)"
        />
        <TextInput
          style={textArea}
          multiline={true}
          numberOfLines={4}
          onChangeText={event => handleChange('taskDescription', event)}
          value={taskDescription}
          placeholder="Task Description"
          placeholderTextColor="rgba(225,225,225,0.7)"
        />
        <TouchableOpacity style={buttonContainer} onPress={handleSubmit}>
          <Text style={buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <AppLayout navigation={navigation} />
    </>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 674,
    backgroundColor: 'black',
    paddingTop: '38%',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
  textArea: {
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
  view: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
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
