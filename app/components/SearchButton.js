import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class SearchButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.handler} style={searchButtonStyles.container}>
        <Text style={searchButtonStyles.button}>{'Search'.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}

searchButtonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  button: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    backgroundColor: '#34495e',
    paddingHorizontal: 15,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10
  }
});
