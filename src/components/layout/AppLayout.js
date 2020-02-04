import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {Alert} from 'react-native';
import firebase from 'react-native-firebase';

import LoadingOverlay from '../overlays/LoadingOverlay';

export default function AppLayout(props) {
  const {navigation} = props;

  const [isLogoutActive, setIsLogoutActive] = useState(false);
  const [isAddDetailsActive, setIsAddDetailsActive] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const logout = async () => {
    setShowOverlay(true);
    setIsLogoutActive(true);
    setIsAddDetailsActive(false);
    await firebase
      .auth()
      .signOut()
      .then(response => {
        setShowOverlay(false);
        navigation.navigate('Login');
      })
      .catch(error => {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  function addform() {
    setIsAddDetailsActive(true);
    setIsLogoutActive(false);
    navigation.navigate('AddForm');
  }

  return (
    <>
      <LoadingOverlay showOverlay={showOverlay} />
      <Footer>
        <FooterTab>
          <Button active={isLogoutActive} onPress={logout}>
            <Text>Log Out</Text>
          </Button>
          <Button active={isAddDetailsActive} onPress={addform}>
            <Text>Add Details</Text>
          </Button>
        </FooterTab>
      </Footer>
    </>
  );
}

AppLayout.propTypes = {children: PropTypes.element.isRequired};
