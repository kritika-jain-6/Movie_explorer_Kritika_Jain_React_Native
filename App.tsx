import React, { Component } from 'react';
import Navigation from './src/navigation/StackNavigation'; // Import Navigation component
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext'; // Import ThemeProvider

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation/>
        </GestureHandlerRootView>
      </ThemeProvider>
    );
    
  }
}

export default App;
