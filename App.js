/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/reducer/reducer';
import Calculator from './src/components/calculator';
import {mapping, light as darkTheme} from '@eva-design/eva';
import {default as appTheme} from './src/assets/custom-theme.json'; // <-- Import app theme
import {default as customMapping} from './src/assets/custom-mapping.json'; // <-- Import custom mapping

const theme = {...darkTheme, ...appTheme};

export default function App() {
  changeNavigationBarColor('#ffffff', true, true);

  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <ApplicationProvider
        mapping={mapping}
        customMapping={customMapping}
        theme={theme}>
        <Calculator />
      </ApplicationProvider>
    </Provider>
  );
}
