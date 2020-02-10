import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

import AppLayout from '../components/layout/AppLayout';

export default function HomeScreen({navigation}) {
  const [state, setState] = useState({time: '', checkedOut: true});
  const [refDate, setRefDate] = useState('');
  const [showTime, setShowTime] = useState('');

  useEffect(() => {
    const useToday = new Date();
    const date =
      useToday.getDate() +
      '-' +
      (useToday.getMonth() + 1) +
      '-' +
      useToday.getFullYear();
    setRefDate(date);
    const ref = firebase
      .firestore()
      .collection(date)
      .orderBy('time', 'desc');
    const l = ref.onSnapshot(querySnapshot => {
      var list = [];
      querySnapshot.forEach(doc => {
        list.push(doc.data());
      });
      if (list.length > 0) {
        setState(list[0]);
        setShowTime(list[0].time);
      }
      return list;
    });
  }, []);

  function toggleCheckOut() {
    const {checkedOut} = state;
    const today = new Date();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    setShowTime(time);
    const ref = firebase.firestore().collection(refDate);
    const data = {
      checkedOut: !checkedOut,
      time,
    };
    ref.add(data);
    setState(data);
  }

  const {checkedOut} = state;
  const {container, center, buttonContainer, buttonText, showtime} = styles;

  return (
    <>
      <SafeAreaView style={container}>
        <TouchableOpacity style={buttonContainer} onPress={toggleCheckOut}>
          <Text style={buttonText}>
            {checkedOut ? 'Check In' : 'Check Out'}
          </Text>
        </TouchableOpacity>
        <View style={center}>
          {showTime !== '' && (
            <Text style={showtime}>
              {checkedOut ? 'Last Check Out : ' : 'Last Check In : '}
              {showTime}
            </Text>
          )}
        </View>
      </SafeAreaView>
      <AppLayout navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  center: {alignItems: 'center'},
  showtime: {
    textAlign: 'center',
    color: '#fff',
    paddingTop: '40%',
    fontSize: 30,
  },
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
