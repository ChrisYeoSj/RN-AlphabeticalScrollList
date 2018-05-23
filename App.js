/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AlphabetisedScrollList from './src/AlphabetisedScrollList';

const styles = StyleSheet.create({
  container:{
    paddingTop:20,
    flex:1,
  },
});

export default class App extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
						<AlphabetisedScrollList/>
				</View>
    );
  }
}
