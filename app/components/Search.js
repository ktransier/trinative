import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, TouchableHighlight, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Map from './Map'
import DatePicker from 'react-native-datepicker';
import SafariView from 'react-native-safari-view';

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      triathlons: [],
      searchTerm: 'San Francisco',
      searchRadius: '200',
      startDate: new Date(),
      endDate: '2019-05-15',
      latitude: 37.78825,
      longitude: -122.4324
    }
  }

  fetchTriathlons = () => {
    Keyboard.dismiss()
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

  renderItem({item}) {
    return(
      <TouchableHighlight onPress={() => (SafariView.show({url: item.race_url}))} style={searchStyles.listItemContainer}>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  setMapRegion = (coordinates) => {
    this.setState({
      region: {
        latitude: coordinates[0],
        longitude: coordinates[1],
        latitudeDelta: 0.122,
        longitudeDelta: 1
      }
    })
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 3}}>
          <Map markers={this.state.triathlons} region={this.state.region}/>
        </View>


        <View style={{flex: 2}}>
          <View style={searchStyles.searchFields}>
            <View style={searchStyles.searchTerm}>
              <Text style={searchStyles.label}>LOCATION</Text>
              <TextInput
                placeholder='Enter location'
                onChangeText={(text) => this.setState({searchTerm: text})}
                value={this.state.searchTerm}
              />
            </View>
            <View style={searchStyles.searchRadius}>
              <Text style={searchStyles.label}>RADIUS (MILES)</Text>
              <TextInput
                placeholder='Enter distance'
                onChangeText={(text) => this.setState({searchRadius: text})}
                value={this.state.searchRadius}
                keyboardType={'number-pad'}
              />
            </View>
          </View>


          <View style={searchStyles.dateRow}>
            <View style={searchStyles.datepicker}>
              <Text style={searchStyles.label}>START DATE</Text>
              <DatePicker
                date={this.state.startDate}
                mode="date"
                placeholder="Start Date"
                format="ddd MMM D, YYYY"
                confirmBtnText="Select"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                  },
                  dateText: {
                    fontSize: 16,
                    color: '#444'
                  }
                }}
                onDateChange={(date) => {this.setState({startDate: date})}}
              />
            </View>
            <View style={searchStyles.datepicker}>
              <Text style={searchStyles.label}>END DATE</Text>
              <DatePicker
                date={this.state.endDate}
                mode="date"
                placeholder="End Date"
                format="ddd MMM D, YYYY"
                confirmBtnText="Select"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start'
                  },
                  dateText: {
                    fontSize: 16,
                    color: '#444'
                  }
                }}
                onDateChange={(date) => {this.setState({endDate: date})}}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this.fetchTriathlons} style={searchStyles.searchButtonContainer}>
            <Text style={searchStyles.searchButton}>SEARCH</Text>
          </TouchableOpacity>
        </View>


        <View style={{flex: 2}}>
          <FlatList
            style={{flex: 1}}
            data={this.state.triathlons}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    )
  }
}

searchStyles = StyleSheet.create({
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
  searchRadius: {
    flex: 1,
  },
  searchButtonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  searchButton: {
    textAlign: 'center',
    height: 40,
    fontSize: 14,
    backgroundColor: '#34495e',
    paddingHorizontal: 15,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10
  },
  dateRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  datepicker: {
    flex: 1,
  },
  listItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15
  }
})