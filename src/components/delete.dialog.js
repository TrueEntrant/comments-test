import React from 'react';
import '../styles/delete.css'
import {Link} from 'react-router-dom';



const Deleting = (props) => {    
  
    return (
    <form className="delete-dialog" action="/" onSubmit={props.onSubmit}>
        <div className='container'>
            <p>Would you realy like to proceed?</p>
            <input className='question' type="submit" value="Yes!"/>
            <Link className='question' to='/'>No!</Link>
        </div>
    </form>
);
}

export default Deleting;