import React,{Component} from 'react';
import firebase from 'firebase';
import {storage} from '../initializers/firebase'
class  ImageUpload extends Component{
 constructor(props){
 super(props);
 this.state={
     image:null,
     url:'',
     userName:''
 }
 this.handleChange=this.handleChange.bind(this);
  this.handleUpload=this.handleUpload.bind(this);

 }
 handleChange = e =>{
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
storage.ref('images').child(image.name).getDownloadURL().then(url =>{
console.log(url);
this.setState({url});

})


 });
}
componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }






 render (){
   return(
       <div>
           <input type="file"  onChange={this.handleChange}/>
           <button onClick={this.handleUpload} >Subir imagen</button>
           <br/>
           <img src={this.state.url || 'https://via.placeholder.com/350x150'} alt="Uploader images" height="200" width="300" />

       </div>
   )


 }



}
export default ImageUpload;