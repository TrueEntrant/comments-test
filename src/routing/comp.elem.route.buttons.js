import {Route, Link} from 'react-router-dom';
import React from 'react';

const EditDelete = (props) => {
    const editPath = `${props.path}/edit`;
    const deletePath = `${props.path}/delete`;
    const replyPath = `${props.path}/replys`;
    
    return(
        <div>
        <Route exact path ='/' render={() => 
            <Link to={editPath} className='Edit'>Edit </Link>
        } />
        <Route exact path ={deletePath} render={() => 
            <Link to={editPath} className='Delete'>Edit </Link>
        } />
        <Route exact path ={replyPath} render={() => 
            <Link to={editPath} className='Edit'>Edit </Link>
        } />
        <Route exact path ={editPath} render={() => 
            <Link to='/' className='Edit'>Edit </Link>
        } />
            |
        <Route exact path ='/' render={() => 
            <Link to={deletePath} className='Delete'>Delete </Link>
        } />
        <Route exact path ={replyPath} render={() => 
            <Link to={deletePath} className='Delete'>Delete </Link>
        } />
        <Route exact path ={editPath} render={() => 
            <Link to={deletePath} className='Delete'>Delete </Link>
        } />
        <Route exact path ={deletePath} render={() => 
            <Link to='/' className='Delete'>Delete </Link>
        } />
        
        </div>
    )
}

const Reply = (props) => {
    const editPath = `${props.path}/edit`;
    const deletePath = `${props.path}/delete`;
    const replyPath = `${props.path}/replys`;

    return (
    <div>
        <Route exact path ={deletePath} render={() => 
            <Link to={replyPath} className='Reply'>Reply</Link>
        } />
        <Route exact path ={editPath} render={() => 
            <Link to={replyPath} className='Reply'>Reply</Link>
        } />
        <Route exact path ={replyPath} render={() => 
            <Link to='/' className='Reply'>Reply</Link>
        } />
        <Route exact path ='/' render={() => 
            <Link to={replyPath} className='Reply'>Reply</Link>
        } />
    </div>
    )
}

export {EditDelete, Reply};
