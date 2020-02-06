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

import AppLayout from '../components/layout/AppLayout';

export default function EditLabourScreen(props) {
  console.log(props);
  const {
    buttonText,
    buttonContainer,
    textArea,
    view,
    input,
    container,
  } = styles;

  return (
    <>
      <SafeAreaView style={container}>
        <Text>Start Time</Text>
      </SafeAreaView>
      {/* <AppLayout navigation={navigation} /> */}
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
