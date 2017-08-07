import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

export default class SearchTextInput extends Component {
  render() {
    return (
      <TextInput
        placeholder={this.props.placeholderText}
        placeholderTextColor={'#ccc'}
        onChangeText={(text) => this.props.onChangeHandler(text)}
        value={this.props.value}
        returnKeyType='search'
        onSubmitEditing={this.props.onSubmitHandler}
        style={SearchTextInputStyles.textInput}
      />
    )
  }
}

SearchTextInputStyles = StyleSheet.create({
  textInput: {
    color: 'white',
    backgroundColor: '#354F6A',
    height: 30,
    borderRadius: 5,
    paddingHorizontal: 10
  }
});
