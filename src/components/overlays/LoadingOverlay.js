import React from 'react';
import {Image} from 'react-native';

export default function LoadingOverlay(props) {
  return <Image source={require('../../static/images/loader.svg')} />;
}
