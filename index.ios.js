import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Search from './app/components/Search'

export default class TriNative extends Component {
  render() {
    return (
      <Search />
    );
  }
}

AppRegistry.registerComponent('TriNative', () => TriNative);