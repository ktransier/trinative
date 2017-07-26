import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class SearchTermInput extends Component {
  render() {
    return (
      <View style={SearchTermInputStyles.container}>
        <Text style={searchStyles.label}>LOCATION</Text>
        <TextInput
          placeholder='Enter location'
          onChangeText={(text) => this.props.handler(text)}
          value={this.props.searchTerm}
        />
      </View>
    )
  }
}

SearchTermInputStyles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
