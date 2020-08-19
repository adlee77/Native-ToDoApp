import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todoInput: '',
      todoArray: [
        {id: 0, title: '1st Task', done: false},
        {id: 1, title: '2nd Task', done: false}
      ]
    }
  }
  render() {
    const statusbar = (Platform.OS == "ios") ? <View style={styles.statusbar}></View> : <View></View>;

  return (
    <View style={styles.container}>
      {statusbar}
      <Header />      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusbar: {
    backgroundColor: 'red',
    height: 20
  }
});
