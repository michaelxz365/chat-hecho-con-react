import React, { Component } from 'react';
import './Form.css';
import Message from '../Message/Message';
import firebase from 'firebase';
import {storage} from '../initializers/firebase'
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName:'',
      message:'',
      list: [],
      image:null,
      url:''
    };
    this.messageRef = firebase.database().ref().child('messages');
    this.listenMessages();
    this.handleChange2=this.handleChange2.bind(this);
  this.handleUpload=this.handleUpload.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
    handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }
  
  listenMessages() {
    this.messageRef
      .limitToLast(15)
      .on('value', message => {
        this.setState({
          list: Object.values(message.val()),
        });
      });
  }
 
 
  handleChange2 = e =>{
    if(e.target.files[0]){
        const image = e.target.files[0];
    this.setState(()=> ({image}));
 
    }
  }
 
  handleUpload =()=>{
    
      const {image}= this.state;
     const uploadTask = storage.ref(`fotos/${image.name}`).put(image);
     uploadTask.on('state_changed',
     (snapshot) => {
    //proceso funcion....
 
 
  }, (error)=>{
 // error funcion 
  console.log(error);
 
 
  }, ()=>{

 // funion completa
 var Descarga=uploadTask.snapshot.Descarga;
 storage.ref('fotos').child(image.name).getDownloadURL().then(url =>{
 console.log(url);
 this.setState({url});


alert("se subio la foto"+ url);
})
 
 
  });
 }
 componentWillReceiveProps(nextProps) {
     if(nextProps.user) {
       this.setState({'userName': nextProps.user.displayName});
     }
   }
   

  














 
 

  render() {
    return (
      <div className="form">
        <div className="form__message">
          { this.state.list.map((item, index) =>
            <Message key={index} message={item} />
          )}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
            disabled={!this.state.userName}
          >
            send
          </button>
        </div>
        <div>
           <input type="file"  onChange={this.handleChange2}/>
           <button onClick={this.handleUpload}  disabled={!this.state.userName}>Subir imagen</button>
           <br/>
           <img src={this.state.url || 'https://via.placeholder.com/350x150'} alt="Uploader images" height="200" width="300" />

       </div>



       <div class="alert alert-primary" role="alert">
       para poder mandar texto debes de iniciar seccion
        </div>
      </div>
    );
  }
}
