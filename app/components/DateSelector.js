import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DateSelector extends Component {
  customStyles() {
    return({
      dateTouch: {
      },
      dateTouchBody: {
        flex: 1,
        flexDirection: 'row',
      },
      dateInput: {
        borderWidth: 0,
        backgroundColor: '#354F6A',
        borderRadius: 5,
        height: 30,
        alignItems: 'flex-start',
        paddingHorizontal: 10
      },
      dateText: {
        fontSize: 16,
        color: 'white'
      }
    })
  }

  render() {
    return (
        <DatePicker
          date={this.props.date}
          mode='date'
          format='ddd MMM D, YYYY'
          confirmBtnText='Select'
          cancelBtnText='Cancel'
          showIcon={false}
          ref={(picker) => { this.datePicker = picker; }}
          customStyles={this.customStyles()}
          onDateChange={(date) => {this.props.dateSelected(date)}}
        />
    )
  }
}
