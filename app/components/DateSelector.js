import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DateSelector extends Component {
  customStyles() {
    return({
      dateInput: {
        borderWidth: 0,
        alignItems: 'flex-start',
      },
      dateText: {
        fontSize: 16,
        color: '#444'
      }
    })
  }

  render() {
    return (
      <View style={dateSelectorStyles.container}>
        <Text style={searchStyles.label}>START DATE</Text>
        <DatePicker
          date={this.props.date}
          mode='date'
          format='ddd MMM D, YYYY'
          confirmBtnText='Select'
          cancelBtnText='Cancel'
          showIcon={false}
          customStyles={this.customStyles()}
          onDateChange={(date) => {this.props.dateSelected(date)}}
        />
      </View>
    )
  }
}

dateSelectorStyles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
