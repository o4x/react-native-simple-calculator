import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value1: 0, value2: 0};
  }
  spinValue1 = new Animated.Value(0);
  spinValue2 = new Animated.Value(0);

  handelRotate1 = () => {
    Animated.timing(this.spinValue1, {
      toValue: this.state.value1 ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
    this.state.value1
      ? setTimeout(() => this.setState({value1: 0, value2: 0}), 200)
      : this.setState({value1: 1});
  };
  handelRotate2 = () => {
    Animated.timing(this.spinValue2, {
      toValue: this.state.value2 ? 0 : 1,
      duration: 500,
      easing: Easing.linear,
    }).start();
    this.state.value2
      ? setTimeout(() => this.setState({value2: 0}), 200)
      : this.setState({value2: 1});
  };
  spin2 = this.spinValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });
  spin1 = this.spinValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  translateY = this.spinValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [height / -20, height / -8],
  });
  opacity = this.spinValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  Pingwheel = () => {
    return (
      !!this.state.value1 && (
        <Animated.View
          style={{
            transform: [{translateY: this.translateY}, {rotate: this.spin2}],
            opacity: this.opacity,
            position: 'absolute',
          }}
          onTouchStart={this.handelRotate2}>
          <Image
            source={require('../assets/pinwheel.png')}
            style={{
              width: 48,
              height: 48,
            }}
          />
        </Animated.View>
      )
    );
  };
  render() {
    return (
      <View style={{flex: 0.3, alignItems: 'center'}}>
        <Animated.View
          style={[{transform: [{rotate: this.spin1}]}, styles.topBar]}
          onTouchStart={this.handelRotate1}>
          <Icon name="up-arrow" size={26} color="white" />
        </Animated.View>
        <this.Pingwheel />
      </View>
    );
  }
}

class Bar extends Component {
  handlePress(val, ope) {
    this.props.dispatch({
      type: 'INPUT',
      action: val,
    });
  }

  render() {
    const {container, scroll, operations, text, equal} = styles;
    return (
      <LinearGradient style={container} colors={['#414345', '#232526']}>
        <TopBar />
        <ScrollView style={scroll} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, '+')}>
            <Text style={text}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, '-')}>
            <Text style={text}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, '×')}>
            <Text style={text}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, '÷')}>
            <Text style={text}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, '%')}>
            <Text style={[text, {fontSize: height / 27}]}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, 'e')}>
            <Text style={[text, {fontSize: height / 18}]}>e</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, 'π')}>
            <Text style={[text, {fontSize: height / 25}]}>π</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, '^')}>
            <Text style={text}>^</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={operations}
            onPress={this.handlePress.bind(this, '√', '** 0.5')}>
            <Text style={[text, {fontSize: height / 25}]}>√</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={equal}
          onPress={this.handlePress.bind(this, '=')}>
          <Text style={text}>=</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

export default connect()(Bar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    marginTop: height / -15,
    marginBottom: height / 80,
    borderRadius: 100,
  },
  topBar: {
    flex: 1,
    width: width / 5,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    transform: [{scaleY: -1}],
  },
  operations: {
    height: height / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'PoiretOne-Regular',
    fontSize: height / 13,
    color: 'white',
    transform: [{scaleY: -1}],
  },
  equal: {
    flex: 0.4,
    backgroundColor: '#6190E8',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
