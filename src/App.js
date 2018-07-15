import React, { Component } from 'react';
import './styles/App.css';
import HeadForm from './logic/header.form'
import CommentsList from './components/comments.list'
import firebase from 'firebase/app';




class App extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.onHeadFormSubmit = this.onHeadFormSubmit.bind(this);

  }
  state = { 
    comments : []
  }

  componentDidMount() {
    const db = firebase.database().ref().child('/comments');

    db.on('value', snap => {
      if(snap.val())
      this.setState({
        comments : snap.val()
      })
    })
  }

  componentDidUpdate() {
    const db = firebase.database().ref().child('/comments');
    db.set(this.state.comments);
        
  }

  onHeadFormSubmit(newComment) {  
    this.setState({
      comments : [...this.state.comments, newComment]
    }) 
  }

  render() {
    return (
      <div className='App'>

        <HeadForm onSubmit={this.onHeadFormSubmit}/>
        <CommentsList commentsArray={this.state.comments} />
        

      </div>
    );
  }
}

export default App;
