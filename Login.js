import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = props => {
    axios({
      method: 'post',
      url: 'http://192.168.1.16:8001/accounts/login/',
      data: {email: email, password: password},
    })
      .then(response => {
        Alert.alert('Success');
        console.log(props);
        // props.navigation.navigate('Details');
      })
      .catch(error => {
        Alert.alert('Error');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LOG IN</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={email => setEmail(email)}
        value={email}
        placeholder="Email"
        name="email"
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={password => setPassword(password)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        name="password"
      />
      <View>
        <Text>{error}</Text>
        <Button title="LOG IN" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
