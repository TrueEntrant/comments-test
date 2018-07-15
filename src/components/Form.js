import React from 'react';
import '../styles/Form.css'


const Form = (props) => {    
    return (
    <form className={props.className} onSubmit={props.onSubmit} action='/'>
        <textarea 
            required name="comment" 
            id="area" 
            cols="30" 
            rows="12" 
            placeholder='Comment text' 
            onChange={props.onTextArea} 
            value={props.state.textArea} 
        />
        <input 
            required 
            id='text' 
            type="text" 
            placeholder='Author name' 
            onChange={props.onTextInput} 
            value={props.state.textInput} 
        />
        <div className='buttons'>
            <div className='btn-cont'>
                <label htmlFor='file' className='file-but'>File</label>
            </div>
            <input id='file' ref={props.file} type="file" accept='.jpg, .png'/>

            <input type="submit" value="Comment"/>
        </div>
    </form>
);
}

export default Form;