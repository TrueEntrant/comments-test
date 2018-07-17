import React, { Component } from 'react';
import Form from '../components/Form'



class HeadForm extends Component {
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
    
    const newComment = {
        author : this.state.textInput,
        text : this.state.textArea,
        reply: [''],
        avatar: this.state.fileInput
    }

    this.props.onSubmit(newComment);
    this.setState({
        textArea : '',
        textInput : '',
        fileInput : ''
    })
  }

  render() {
    return (
        <Form 
          className="header form"
          state={this.state} 
          onTextArea={this.onTextAreaChange}
          onTextInput={this.onTextInputChange}
          onFileInput={this.onFileChange}
          onSubmit={this.onFormSubmit}
        />
    );
  }
}

export default HeadForm;
