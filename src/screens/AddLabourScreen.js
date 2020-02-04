import React, {useState} from 'react';
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

export default function AddLabourScreen() {
  const [state, setState] = useState({
    startTime: '0',
    endTime: '0',
    unionCode: '',
    taskId: '',
    taskDescription: '',
  });

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
      ...{[name]: value},
    };
    setState(data);
  }

  function handleSubmit() {
    console.log(state);
  }

  return (
    <SafeAreaView style={container}>
      <View style={view}>
        <Text>Start Time</Text>
        <TimePicker
          selectedHours={state.startHours}
          selectedMinutes={state.startMins}
          onChange={(hours, mins) => {
            handleChange('startTime', `${hours}:${mins}`);
          }}
        />
      </View>
      <View style={view}>
        <Text>End Time</Text>
        <TimePicker
          selectedHours={state.endHours}
          selectedMinutes={state.endMins}
          onChange={(hours, mins) => {
            handleChange('endTime', `${hours}:${mins}`);
          }}
        />
      </View>
      <View style={view}>
        <Picker
          selectedValue={state.unionCode}
          onValueChange={itemValue => {
            handleChange('unionCode', itemValue);
          }}>
          <Picker.Item label="CODE 1" value="1" />
          <Picker.Item label="CODE 2" value="2" />
        </Picker>
      </View>
      <TextInput
        style={input}
        onChangeText={event => handleChange('taskId', event)}
        value={state.taskId}
        placeholder="Task ID"
        placeholderTextColor="rgba(225,225,225,0.7)"
      />
      <TextInput
        style={textArea}
        multiline={true}
        numberOfLines={4}
        onChangeText={event => handleChange('taskDescription', event)}
        value={state.taskDescription}
        placeholder="Task Description"
        placeholderTextColor="rgba(225,225,225,0.7)"
      />
      <TouchableOpacity style={buttonContainer} onPress={handleSubmit}>
        <Text style={buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 729,
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
