import React, {useState} from 'react';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // navigation.navigate('Home');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        navigation.navigate('Home');
      })
      .catch(error => {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  function handleChange(event, name) {
    if (name === 'email') {
      setEmail(event);
    } else {
      setPassword(event);
    }
  }

  const {input, container, buttonContainer, buttonText} = styles;

  return (
    <SafeAreaView style={container}>
      <TextInput
        style={input}
        onChangeText={event => handleChange(event, 'email')}
        value={email}
        placeholder="Email"
        placeholderTextColor="rgba(225,225,225,0.7)"
      />
      <TextInput
        style={input}
        onChangeText={event => handleChange(event, 'password')}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="rgba(225,225,225,0.7)"
      />
      <TouchableOpacity
        // disabled={email === '' || password === '' ? true : false}
        style={buttonContainer}
        onPress={handleLogin}>
        <Text style={buttonText}>LOGIN</Text>
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
