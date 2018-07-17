import React from 'react';
import '../styles/delete.css'
import {Link} from 'react-router-dom';



const Deleting = (props) => {    
  
    return (
    <div className="delete-dialog">
        <div className='container'>
            <p>Would you realy like to proceed?</p>
            <Link className='question' to='/' onClick={props.onSubmit} value="Yes!">
                Yes!
            </Link>
            <Link className='question' to='/'>No!</Link>
        </div>
    </div>
);
}

export default Deleting;