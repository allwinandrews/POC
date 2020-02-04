import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, TouchableOpacity} from 'react-native';

import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
} from 'native-base';

export default function AppLayout({...props}) {
  const {children} = props;
  return (
    <SafeAreaView>
      {children}
      <Footer>
        <FooterTab>
          <Button>
            <Text>Apps</Text>
          </Button>
          <Button>
            <Text>Camera</Text>
          </Button>
          <Button active>
            <Text>Navigate</Text>
          </Button>
          <Button>
            <Text>Contact</Text>
          </Button>
        </FooterTab>
      </Footer>
    </SafeAreaView>
  );
}

AppLayout.propTypes = {children: PropTypes.element.isRequired};
