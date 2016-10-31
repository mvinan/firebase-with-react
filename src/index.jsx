import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCtsmvOk0J7Po4zZSQhXEdHluVKIgc_dM8',
  authDomain: 'react-firebase-3df55.firebaseapp.com',
  databaseURL: 'https://react-firebase-3df55.firebaseio.com',
  storageBucket: 'react-firebase-3df55.appspot.com',
  messagingSenderId: '1001855333971'
}
firebase.initializeApp(config)

class App extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      lastName: ''
    }
  }

  componentWillMount(){
    const nameRef = firebase.database().ref().child('object')

    nameRef.on('value', (snapshot) => {
      this.setState({
        name: snapshot.child('name').val(),
        lastName: snapshot.child('lastName').val()
      })
    })
  }

  render() {
    const {name, lastName} = this.state
    return (
      <div>
        <h1>Hola {`${name} ${lastName}`}! Estamos con FireBase</h1>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
