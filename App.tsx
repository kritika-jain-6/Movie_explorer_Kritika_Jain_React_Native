import React, { Component } from 'react';
import Navigation from './src/navigation/StackNavigation'; // Import Navigation component
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import 'react-native-gesture-handler';
import { WatchlistProvider } from './src/context/WatchlistContext'; // Import WatchlistProvider

class App extends Component {
  render() {
    return (
      <WatchlistProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation/>
        </GestureHandlerRootView>
      </WatchlistProvider>
    );
    
  }
}

export default App;
