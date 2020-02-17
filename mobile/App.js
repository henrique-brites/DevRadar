import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routs from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#12B6E0" />
      <Routs />
    </>
  );
}