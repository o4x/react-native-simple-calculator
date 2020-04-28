import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  I18nManager,
} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Display from './display';
import Numbers from './numbers';
import Bar from './bar';

const {width, height} = Dimensions.get('window');

class Calculator extends Component {
  render() {
    const {container, display, bottom, buttons, numbers, bar, fromRight} = styles;
    return (
      <LinearGradient style={container} colors={['#6190E8', '#A7BFE8']}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={'#00000000'}
          translucent={true}
        />
        <View style={display}>
          <Display />
        </View>
        <View style={bottom}>
          <View style={bar}>
            <View style={fromRight} />
            <Bar />
          </View>
          <View style={buttons}>
            <View style={numbers}>
              <Numbers />
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 5,
  },
  bottom: {
    flex: 8,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    backgroundColor: 'white',
    borderTopEndRadius: width / 25,
    borderTopStartRadius: width / 25,
  },
  buttons: {
    flex: 4,
  },
  numbers: {
    flex: 4,
  },
  bar: {
    flex: 1.4,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  fromRight: {
    flex: 0.3,
  },
});
