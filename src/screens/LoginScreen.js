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

export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        props.navigation.navigate('Home');
      })
      .catch(error => {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        placeholderTextColor="rgba(225,225,225,0.7)"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="rgba(225,225,225,0.7)"
        name="password"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
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
