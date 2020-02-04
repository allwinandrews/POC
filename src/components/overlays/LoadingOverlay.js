import React from 'react';
import {View, Image} from 'react-native';

export default function LoadingOverlay(props) {
  let loaderStyles = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    'z-index': 9999,
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,.6)',
    'text-align': 'center',
    display: props.showOverlay ? 'block' : 'none',
  };

  const imageStyle = {
    height: '150px',
    top: 'calc(50% - 50px)',
    position: 'relative',
  };

  return (
    <View style={loaderStyles}>
      <Image
        style={imageStyle}
        source={require('../../static/images/loader.svg')}
      />
    </View>
  );
}
