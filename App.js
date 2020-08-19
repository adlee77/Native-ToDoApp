import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './Components/Header';
import InputBar from './Components/InputBar';
import TodoItem from './Components/TodoItem';

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

  addNewTodo () {
    let todos = this.state.todoArray;
    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false
    })

    this.setState({
      todos,
      todoInput: ''
    })
  }

  toggleDone (item) {
    let todoArray = this.state.todoArray;
    todoArray = todoArray.map((todo) => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }
      return todo;
    })
    this.setState({todoArray});
  }

  removeTodo (item) {
    let todoArray = this.state.todoArray;
    todoArray = todoArray.filter((todo) => todo.id !== item.id);

    this.setState({todoArray});
  }

  render() {
    const statusbar = (Platform.OS == "ios") ? <View style={styles.statusbar}></View> : <View></View>;

  return (
    <View style={styles.container}>
      {statusbar}
      <Header title="TODO APP"/>     
      <InputBar 
        textChange={todoInput => this.setState({ todoInput })} 
        addNewTodo={() => this.addNewTodo() }
        todoInput={this.state.todoInput}
      />
      <FlatList 
        data={this.state.todoArray} 
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ ({item, index}) => {
          return (
            <TodoItem todoItem={item} toggleDone={() => this.toggleDone(item)} removeTodo={() => this.removeTodo(item)}/>
          )
        }}
      />
      <Text>{this.state.todoInput}</Text>
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
    backgroundColor: 'black',
    height: 30
  }
});
