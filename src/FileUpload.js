import React,{Component} from 'react';
import firebase from 'firebase';
import firebaseConfig from './config';
import Message from './Message/Message';



class FiledUpload extends Component{
  constructor(){
 super();
 this.state={
  uploadValue: 0,
  picture:null
};

  }

 
   render(){
    return(
        <div>
            <progress value={this.state.uploadValue}max="100"></progress>
            <br/>
         <input type="file" onChange={this.props.handleUpload}/>
         <br/>

        </div>
    );

   }

}









export default FiledUpload;