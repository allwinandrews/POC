import React, {useState} from 'react';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setLoading(false);
        setEmail('');
        setPassword('');
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

  const {input, container, buttonContainer, buttonText, image} = styles;

  return (
    <SafeAreaView style={container}>
      {loading ? (
        <View>
          <Image
            style={image}
            source={require('../static/images/Spinner-1s-200px.png')}
          />
        </View>
      ) : (
        <>
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
            disabled={email === '' || password === '' ? true : false}
            style={buttonContainer}
            onPress={handleLogin}>
            <Text style={buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
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
