import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form/Form.js';
import firebase from 'firebase';
import firebaseConfig from './config';
import FileUpload from './FileUpload';
import ImageUpload from './components/ImageUpload';

//firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      pictures:[]
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }

  handleUpload(event)
  {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);
    
    task.on('state_changed' , snapshot =>{
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue : percentage
      })
    } , error =>{
      console.log(error.message);
    } , () =>{
         storageRef.getDownloadURL().then(url => {
                  this.setState({
                      picture: url
                  });
              })
    });
  }
render() {
    return (
      <div className="app">
        <div className="app__header">
          <img src={logo} className="app__logo" alt="logo" />
          <h2>
           Examen final de web 
          </h2>
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
            
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
           
     
        )}
          
        </div>
      <div className="app__list">
          <Form user={this.state.user} />
        </div>
       <br/>
    
       </div>
      
       
    );
  }
}
export default App;
