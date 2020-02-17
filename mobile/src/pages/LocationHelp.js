import React from 'react';
import { WebView } from 'react-native-webview';

function LocationHelp({ navigation }) {
  const helpUri = navigation.getParam('help_url');

  // return <WebView style={{ flex: 1 }} source={{ uri: 'http://temdetudo.ncsystem.com.br/' }} />
  return <WebView style={{ flex: 1 }} source={{ uri: helpUri }} />;
}

export default LocationHelp;
