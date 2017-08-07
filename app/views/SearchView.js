import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, TouchableHighlight, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Map from '../components/Map';
import SearchButton from '../components/SearchButton';
import DateSelector from '../components/DateSelector';
import TriathlonList from '../components/TriathlonList';
import SearchTextInput from '../components/SearchTextInput';

export default class SearchView extends Component {
  constructor() {
    super()
    this.state = {
      triathlons: [],
      searchTerm: 'San Francisco',
      searchRadius: '100',
      startDate: new Date(),
      endDate: '2019-05-15',
      latitude: 37.78825,
      longitude: -122.4324
    }
  }

  fetchTriathlons = () => {
    Keyboard.dismiss();
    fetch(`https://tri-api.herokuapp.com/triathlons.json?search_term=${this.state.searchTerm}&start_date=${this.state.startDate}&end_date=${this.state.endDate}&search_radius=${this.state.searchRadius}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({triathlons: responseJson.triathlons})
        this.setMapRegion(responseJson.coordinates)
      })
  }

  componentDidMount() {
    this.fetchTriathlons();
  }

  setMapRegion = (coordinates) => {
    this.setState({
      region: {
        latitude: coordinates[0],
        longitude: coordinates[1],
        latitudeDelta: (this.state.searchRadius * 2) / 65,
        longitudeDelta: (this.state.searchRadius* 2) / 65
      }
    })
  }

  startDateSelected = (date) => {
    this.setState({startDate: date}, () => {
      this.fetchTriathlons();
    })
  }

  endDateSelected = (date) => {
    this.setState({endDate: date}, () => {
      this.fetchTriathlons();
    })
  }

  searchRadiusSelected = (searchRadius) => {
    this.setState({searchRadius: searchRadius})
  }

  searchTermSelected = (searchTerm) => {
    this.setState({searchTerm: searchTerm})
  }

  render() {
    return(
      <View style={{flex: 1}}>

        <View style={searchStyles.searchBar}>
          <View style={searchStyles.searchFields}>
            <SearchTextInput
              placeholderText={'Enter location'}
              value={this.state.searchTerm}
              onChangeHandler={this.searchTermSelected}
              onSubmitHandler={this.fetchTriathlons}/>
            <SearchTextInput
              placeholderText={'Enter radius (MI)'}
              value={this.state.searchRadius}
              onChangeHandler={this.searchRadiusSelected}
              onSubmitHandler={this.fetchTriathlons}/>
          </View>
          <View style={searchStyles.dateRow}>
            <DateSelector date={this.state.startDate} dateSelected={this.startDateSelected} label={'START DATE'}/>
            <DateSelector date={this.state.endDate} dateSelected={this.endDateSelected} label={'END DATE'}/>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Map markers={this.state.triathlons} region={this.state.region}/>
        </View>

        <View style={{flex: 1}}>
          {this.state.triathlons.length == 0 &&
            <Text style={searchStyles.emptyState}>No Results Found</Text>
          }
          <TriathlonList triathlons={this.state.triathlons}/>
        </View>
      </View>
    )
  }
}

searchStyles = StyleSheet.create({
  searchBar: {
    height: 110,
    backgroundColor: "#2A4057"
  },
  emptyState: {
    marginTop: 30,
    textAlign: 'center'
  },
  label: {
    paddingBottom: 4,
    fontSize: 12,
    fontWeight: '700'
  },
  searchFields: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  searchTerm: {
    flex: 1,
  },
  dateRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
})
