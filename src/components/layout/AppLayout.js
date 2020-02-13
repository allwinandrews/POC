import React, {useEffect} from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {Alert} from 'react-native';
import firebase from 'react-native-firebase';
// import RNLocation from 'react-native-location';

export default function AppLayout({navigation}) {
  // useEffect(() => {
  //   RNLocation.requestPermission({
  //     ios: 'whenInUse',
  //     android: {
  //       detail: 'coarse',
  //     },
  //   }).then(granted => {
  //     console.log('Location access: ', granted);
  //   });
  // }, []);
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
          {navigation.state.routeName !== 'Add Labour' && (
            <Button active onPress={addform}>
              <Text>Add Labour</Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </>
  );
}
