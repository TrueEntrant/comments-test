import React, { Component } from 'react';
import ReplyForm from '../components/Form.link';




class ReplyFormLogic extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  state = { 
    textArea : '',
    textInput : '',
    fileInput : ''
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
  
  onFileChange(e) {
    this.setState({
      fileInput : e.target.files[0]
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
        
    const newReply = {
        author : this.state.textInput,
        text : this.state.textArea,
        reply: [''],
        avatar: this.state.fileInput
    }

    this.props.onSubmit(newReply);
    this.setState({
        textArea : '',
        textInput : '',
        fileInput : ''
    })
  }

  render() {
    return (
      <div className="rep-form-wrap">
        <ReplyForm 
          className="reply form"
          state={this.state} 
          onTextArea={this.onTextAreaChange}
          onTextInput={this.onTextInputChange}
          onFileChange={this.onFileChange}
          onSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}

export default ReplyFormLogic;