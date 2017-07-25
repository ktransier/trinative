import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {
  render() {
    return(
      <MapView
        style={styles.map}
        region={this.props.region}
      >
        {this.props.markers.map(marker => (
          <MapView.Marker
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.name}
            key={marker.id}
          />
        ))}
      </MapView>
    )
  }
}

styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})