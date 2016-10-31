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

class FileUpload extends Component{
  constructor(){
    super()
    this.state = {
      uploadValue: 0
    }
  }

  handleOnChange(event){
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      this.setState({
        message: `Ha ocurrido un error: ${error.message}`
      })
    }, () => {
      this.setState({
        message: 'Archivo subido',
        picture: task.snapshot.downloadURL
      })
    })
  }

  render(){
    const {message, uploadValue, picture} = this.state
    return (
      <div>
        <progress value={uploadValue} max='100'/>
        <br/>
        <input type='file' onChange={this.handleOnChange.bind(this)}/>
        <br/>
        {message}
        <br/>
        <img width='100' src={picture}/>
      </div>
    )
  }
}


ReactDOM.render(<FileUpload />, document.getElementById('root'))
