import React from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {Alert} from 'react-native';
import firebase from 'react-native-firebase';

export default function AppLayout(props) {
  const {navigation} = props;

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(response => {
        navigation.navigate('Login');
      })
      .catch(error => {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  function addform() {
    navigation.navigate('Add Labour');
  }

  return (
    <>
      <Footer>
        <FooterTab>
          <Button onPress={logout}>
            <Text>Log Out</Text>
          </Button>
          <Button active onPress={addform}>
            <Text>Add Details</Text>
          </Button>
        </FooterTab>
      </Footer>
    </>
  );
}
