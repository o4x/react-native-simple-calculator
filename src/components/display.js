import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

class Display extends Component {
  state = {
    showHistory: 0,
  };

  history = [];
  mapHistory = () => {
    this.history = [];
    for (let i of this.props.history) {
      this.history.push(
        <View>
          <Text style={styles.textResult}>{i}</Text>
          <View style={styles.hr} />
        </View>
      );
    }
  };

  render() {
    const {contain, top, result, input, textResult, textInput, history} = styles;
    return (
      <View style={contain} snapToEnd={true}>
        {!this.state.showHistory ? (
          <View style={{flex: 3}}>
            <TouchableOpacity
              style={top}
              onPress={() => {
                this.setState({showHistory: 1});
                this.mapHistory();
              }}>
              <Icon name="history" size={36} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flex: 0.3}}>
            <TouchableOpacity
              style={top}
              onPress={() => this.setState({showHistory: 0})}>
              <Icon name="close" size={36} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {!this.state.showHistory ? (
          <>
            <View style={result}>
              <Text
                style={textResult}
                selectable={true}
                selectionColor={'white'}
                numberOfLines={1}>
                {this.props.result}
              </Text>
            </View>
            <View style={input}>
              <TextInput
                style={textInput}
                placeholder={'0'}
                placeholderTextColor={'white'}
                selectionColor={'gray'}
                multiline
                showSoftInputOnFocus={false}
                caretHidden={true}
                onChangeText={text => this.props.changeInput(text)}
                value={this.props.input}
              />
            </View>
          </>
        ) : (
          <ScrollView style={history} showsVerticalScrollIndicator={false}>
            {this.history}
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = dispatch => {
  return {
    input: dispatch.input,
    result: dispatch.result,
    history: dispatch.history,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeInput: val =>
      dispatch({type: 'INPUT', action: 'keyboard', value: val}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);


const styles = StyleSheet.create({
  contain: {
    flex: 1,
    margin: 20,
    borderRadius: width / 20,
  },
  top: {
    flex: 1,
    top: height / 50,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  result: {
    flex: 1,
  },
  input: {
    flex: 4,
    marginTop: 20,
  },
  textResult: {
    fontSize: width / 15,
    color: 'white',
  },
  textInput: {
    textAlignVertical: 'bottom',
    fontSize: width / 8,
    color: 'white',
  },
  history: {
    flex: 1,
  },
  hr: {
    marginVertical: height / 50,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
