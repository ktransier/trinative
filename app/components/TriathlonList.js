import React, { Component } from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import SafariView from 'react-native-safari-view';
import Moment from 'moment';

export default class SearchButton extends Component {
  renderItem({item}) {
    return(
      <TouchableOpacity onPress={() => (SafariView.show({url: item.race_url}))} style={triathlonListStyles.listItemContainer}>
        <View>
          <Text style={triathlonListStyles.title}>{item.name}</Text>
          <Text>{Moment(item.date).format('ddd MMM D, YYYY')}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        style={{flex: 1}}
        data={this.props.triathlons}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
      />
    )
  }
}

triathlonListStyles = StyleSheet.create({
  listItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 17,
    fontWeight: '500'
  },
  date: {
  }
});
