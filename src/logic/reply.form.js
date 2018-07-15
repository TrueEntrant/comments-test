import React, { Component } from 'react';
import Form from '../components/Form';




class ReplyForm extends Component {
  constructor(props) {
    super(props);

    // this.sldfkgnl = React.createRef();
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  state = { 
    textArea : '',
    textInput : '',
    // fileInput : ''
  }

  onTextAreaChange(e) {
    this.setState({
      textArea : e.target.value
    });
  }

  onTextInputChange(e) {
    this.setState({
      textInput : e.target.value
    });
  }
  
//   onTextInputChange(e) {
//     this.setState({
//       fileInput : e.target.value
//     });
//   }

  onFormSubmit(event) {
    
     
    const newComment = {
        author : this.state.textInput,
        text : this.state.textArea,
        replys: []
    }
    
    this.props.onSubmit(newComment, event);

    this.setState({
        textArea : '',
        textInput : ''
    })
  }

  render() {
    return (
      <div className="rep-form-wrap">
        <Form 
          className="reply form"
          state={this.state} 
          onTextArea={this.onTextAreaChange}
          onTextInput={this.onTextInputChange}
          // onFileInput={this.state.fileInput}
          onSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}

export default ReplyForm;