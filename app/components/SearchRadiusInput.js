import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class SearchRadiusInput extends Component {
  render() {
    return (
      <View style={SearchRadiusSelectorStyles.container}>
        <Text style={searchStyles.label}>RADIUS (MILES)</Text>
        <TextInput
          placeholder='Enter distance'
          onChangeText={(text) => this.props.handler(text)}
          value={this.props.searchRadius}
          keyboardType={'number-pad'}
        />
      </View>
    )
  }
}

SearchRadiusSelectorStyles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
