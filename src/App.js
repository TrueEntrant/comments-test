import React, { Component } from 'react';
import './styles/App.css';
import HeadForm from './logic/header.form'
import CommentsList from './components/comments.list'
import firebase from 'firebase/app';


class App extends Component {
  constructor(props) {
    super(props);
    this.storage = firebase.storage().ref().child("/authors.avatars");
    this.db = firebase.database().ref().child('/comments');

    this.fileInput = React.createRef();
    this.onHeadFormSubmit = this.onHeadFormSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this); 
    this.onDelonReplyFormSubmit = this.onReplyFormSubmit.bind(this); 
  }

  state = { 
    comments : []
  }

  componentWillUnmount() {
 
    this.setState({
      comments : []
    })
  }

  onDelete(index, path) {
    const db = firebase.database().ref().child('/comments');
    
    const arrayPath = path.split('/'); 
    arrayPath.concat(index);
    path = arrayPath.join('/');

    console.log(path);

    db.child(`${path}`).remove();
    

   

  }
  

  componentDidMount() {

    this.db.on('value', snap => {
      if(snap.val())
      this.setState({
        comments : snap.val()
      })
    })
  }

  componentDidUpdate() {
    this.db.set(this.state.comments);
  }

  onHeadFormSubmit(newComment) {  
    const storage = firebase.storage().ref().child("/authors.avatars");
    const length = (  this.state.comments.length ?
                      this.state.comments.length :
                      0 )
    storage.child(`${length}/${newComment.avatar.name}`)
    .put(newComment.avatar)
    .then((res) => {
      newComment.avatar = res.metadata.fullPath;
      this.setState({
        comments : [...this.state.comments, newComment]
      }) 
    })
    .catch(err => console.log(err)); 
  }

  onReplyFormSubmit(newReply, path) {  
    const storage = firebase.storage().ref().child("/authors.avatars");
    const db = firebase.database().ref().child('/comments');

    storage.child(`${path}/${newReply.avatar.name}`)
    .put(newReply.avatar)
    .then((res) => {
      const replys = db.child(`${path}/replys`);
      newReply.avatar = res.metadata.fullPath;

      replys.once('value').then(res => {
        const replysData = res.val();
        if(!!replysData) {
          const newReplys = [...replysData, newReply];
          replys.set(newReplys);
        }
        else {
          const newReplys = [...[], newReply];
          replys.set(newReplys);

        }
      }
      )
      
    })
    .catch(err => console.log(err)); 
  }

  render() {

    return (
      <div className='App'>
        <HeadForm onSubmit={this.onHeadFormSubmit}/>
        <CommentsList 
          onReply={this.onReplyFormSubmit}
          onDelete={this.onDelete} 
          commentsArray={this.state.comments} 
        />
      </div>
    );
  }
}

export default App;
