import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import SafariView from 'react-native-safari-view';
import Moment from 'moment';

export default class Map extends Component {
  render() {
    return(
      <MapView
        style={styles.map}
        region={this.props.region}
        showsUserLocation={true}
      >
        {this.props.markers.map(marker => (
          <MapView.Marker
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.name}
            key={marker.id}
            image={require('../assets/map-marker.png')}
          >
          <MapView.Callout>
            <TouchableOpacity onPress={() => (SafariView.show({url: marker.race_url}))}>
              <View>
                <Text>{marker.name}</Text>
                <Text>{Moment(marker.date).format('ddd MMM D, YYYY')}</Text>
              </View>
            </TouchableOpacity>
          </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    )
  }
}

styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
