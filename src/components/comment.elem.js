import React from 'react';
import '../styles/Comment.css'
import {EditDelete, Reply} from '../routing/comp.elem.route.buttons'
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';


const ComentElem = (props) => {    
    const path = props.path
    const avatar = props.data.avatarIMG;
   
    return (
    <div className='wrap'>
        <img src={avatar} alt="avatar"/>
        <div className='text'>
            <h2 className='author'>{props.data.author}</h2>
            <div className='links'>

           <EditDelete path={path}/>

            </div>
           <Route exact path='/' render={() => {
            return (
                <p className='comment'>
                    {props.data.text}
                </p>
            )}} />
            <Route exact path={`${path}/delete`} render={() => {
            return (
                <p className='comment'>
                    {props.data.text}
                </p>
            )}} />
            <Route exact path={`${path}/replys`} render={() => {
            return (
                <p className='comment'>
                    {props.data.text}
                </p>
            )}} />
            
            <Route exact path={`${path}/edit`} render={() => {
            return (
                <div className='edit'>
                    <textarea 
                        className='edit-comment'
                        value={props.editValue}
                        onChange={props.onChange}
                    />
                    <Link
                        to="/" 
                        className='edit-btn' 
                        type="button"  
                        onClick={props.onSubmit}
                    >OK!</Link>
                </div>
            )}} />
            <Reply path={path}/>
        </div>
    </div>
);
}

export default ComentElem;