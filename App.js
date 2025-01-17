import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { VotingProvider } from './src/context/VotingContext';

function App() {
  return (
    <SafeAreaProvider>
      <VotingProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </VotingProvider>
    </SafeAreaProvider>
  );
}

export default App;
