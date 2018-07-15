import React from 'react';
import '../styles/Comment.css'
import img from '../img/standart.png';
import {EditDelete, Reply} from '../routing/comp.elem.route.buttons'


const ComentElem = (props) => {    
    const avatar = props.avatar || img;
    const path = props.path
    return (
    <div className='wrap'>
        <img src={avatar} alt="avatar"/>
        <div className='text'>
            <h2 className='author'>{props.data.author}</h2>
            <div className='links'>

           <EditDelete path={path}/>

            </div>
            <p className='comment'>
                {props.data.text}
            </p>
            
            <Reply path={path}/>
        </div>
    </div>
);
}

export default ComentElem;