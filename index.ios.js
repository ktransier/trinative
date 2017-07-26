import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import SearchView from './app/views/SearchView';

export default class Triathlons extends Component {
  render() {
    return (<SearchView />);
  }
}

AppRegistry.registerComponent('Triathlons', () => Triathlons);
