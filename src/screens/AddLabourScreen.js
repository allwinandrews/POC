import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  Button,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Image,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import firebase from 'react-native-firebase';
import Geolocation from 'react-native-geolocation-service';

import AppLayout from '../components/layout/AppLayout';

export default function AddLabourScreen({navigation}) {
  var watchId = null;
  const initialState = {
    startTime: '',
    endTime: '',
    unionCode: '0',
    taskId: '',
    taskDescription: '',
  };
  const [state, setState] = useState(initialState);
  const [startHours, setStartHours] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [startMins, setStartMins] = useState(0);
  const [endMins, setEndMins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});

  const {
    buttonText,
    buttonContainer,
    textArea,
    view,
    input,
    container,
    image,
  } = styles;

  async function hasLocationPermission() {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  }

  async function getLocation() {
    const locationPermission = await hasLocationPermission();

    if (!locationPermission) return;

    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        setLoading(false);
      },
      error => {
        setLocation(error);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  }

  async function getLocationUpdates() {
    const locationPermission = await hasLocationPermission();

    if (!locationPermission) return;
    watchId = Geolocation.watchPosition(
      position => {
        setLocation(position);
      },
      error => {
        setLocation(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  }

  function removeLocationUpdates() {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
    }
  }

  useEffect(() => {
    getLocationUpdates();
  }, []);

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
    Keyboard.dismiss();
    setLoading(true);
    var date = new Date().getDate(),
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear();
    const refDate = date + '-' + month + '-' + year;
    const ref = firebase.firestore().collection(`labour details(${refDate})`);
    const data = {
      ...state,
      location,
    };
    ref.add(data).then(() => setLoading(false));
    setStartHours(0);
    setStartMins(0);
    setEndHours(0);
    setEndMins(0);
    setState(initialState);
    // navigation.navigate('Edit Labour', data);
    navigation.navigate('Home');
    removeLocationUpdates();
  }

  const {taskDescription, taskId, unionCode, startTime, endTime} = state;
  return (
    <>
      <KeyboardAvoidingView style={container} behavior="padding" enabled>
        {loading ? (
          <View>
            <Image
              style={image}
              source={require('../static/images/Spinner-1s-200px.png')}
            />
          </View>
        ) : (
          <>
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
                <Picker.Item label="Select Union Code" value="0" />
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
            <TouchableOpacity
              disabled={
                taskDescription === '' ||
                taskId === '' ||
                startTime === '' ||
                endTime === '' ||
                unionCode === '0'
                  ? true
                  : false
              }
              style={buttonContainer}
              onPress={handleSubmit}>
              <Text style={buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
      <AppLayout navigation={navigation} />
    </>
  );
}

// define your styles
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '50%',
  },
  container: {
    padding: 20,
    height: 674,
    backgroundColor: 'black',
    paddingTop: '20%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
