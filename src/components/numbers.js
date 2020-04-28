import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

class Numbers extends Component {
  handlePress(val) {
    this.props.dispatch({
      type: 'INPUT',
      action: val,
    });
  }

  render() {
    const {row, col, touch, text, operations, operation} = styles;
    return (
      <View style={col}>
        <View style={row}>
          <ScrollView
            style={[row, operations]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, '(')}>
              <Text style={operation}>(</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, ')')}>
              <Text style={operation}>)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, '!')}>
              <Text style={operation}>!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, ' deg')}>
              <Text style={operation}>deg</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, ' rad')}>
              <Text style={operation}>rad</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, 'sin(')}>
              <Text style={operation}>sin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, 'cos(')}>
              <Text style={operation}>cos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, 'tan(')}>
              <Text style={operation}>tan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={touch}
              onPress={this.handlePress.bind(this, 'log(')}>
              <Text style={operation}>log</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={row}>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '7')}>
            <Text style={text}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '8')}>
            <Text style={text}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '9')}>
            <Text style={text}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={row}>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '4')}>
            <Text style={text}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '5')}>
            <Text style={text}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '6')}>
            <Text style={text}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={row}>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '1')}>
            <Text style={text}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '2')}>
            <Text style={text}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '3')}>
            <Text style={text}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={row}>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '.')}>
            <Text style={text}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touch}
            onPress={this.handlePress.bind(this, '0')}>
            <Text style={text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[touch]}
            onPress={this.handlePress.bind(this, 'C')}
            onLongPress={this.handlePress.bind(this, 'CC')}>
            <Icon name="delete" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToPros = state => {
  return {
    input: state.input,
  };
};

export default connect(mapStateToPros)(Numbers);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 10,
  },
  operations: {
    flex: 1,
  },
  operation: {
    width: width / 4,
    textAlign: 'center',
    fontFamily: 'PoiretOne-Regular',
    fontSize: 32,
    color: 'gray',
  },
  touch: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});
