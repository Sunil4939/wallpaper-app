import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Root from './Root';
import {Provider} from 'react-redux';
import {store, persistor} from './redux';
import {PersistGate} from 'redux-persist/integration/react';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
