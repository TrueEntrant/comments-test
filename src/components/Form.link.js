import React from 'react';
import '../styles/Form.css'
import { Link } from 'react-router-dom';


const ReplyForm = (props) => {    
    return (
    <form className={props.className} action='/' onSubmit={props.onSubmit}>
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
                <label htmlFor='file1' className='file-but'>File</label>
            </div>
            <input required id='file1' onChange={props.onFileChange} type="file" accept='.jpg, .png'/>

           
            <input type="submit" value="Comment"/>
            
        </div>
    </form>
);
}

export default ReplyForm;