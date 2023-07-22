import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Provider} from 'react-redux';
import { store } from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>Yo</Text>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
