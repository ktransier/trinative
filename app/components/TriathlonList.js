import React, { Component } from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableHighlight,
   View
} from 'react-native';
import SafariView from 'react-native-safari-view';
import Moment from 'moment';

export default class SearchButton extends Component {
  renderItem({item}) {
    return(
      <TouchableHighlight onPress={() => (SafariView.show({url: item.race_url}))} style={triathlonListStyles.listItemContainer}>
        <View>
          <Text>{item.name}</Text>
          <Text>{Moment(item.date).format('ddd MMM D, YYYY')}</Text>
        </View>
      </TouchableHighlight>
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
    paddingVertical: 10,
    paddingHorizontal: 15
  }
});
