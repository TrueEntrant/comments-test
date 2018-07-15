import React, { Component } from 'react';
import '../styles/Comment.css'
import CommentElem from '../components/comment.elem'
import {BrowserRouter , Route, Link} from 'react-router-dom';
import ReplyForm from './reply.form';
import firebase from 'firebase/app';
import Delete from './delete.comment';


class Comment extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            path : this.props.path,
            body : this.props.body
        }
        this.onReplyFormSubmit = this.onReplyFormSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }



    onReplyFormSubmit(newReply, event) {
        const db = firebase.database().ref().child('/comments');

        if(this.state.body.replys) {
            const newReplys = [...this.state.body.replys, newReply];
            db.child(`${this.state.path}/replys`).set(newReplys);
        }
        else {
           const newReplys = [...[], newReply];
            db.child(`${this.state.path}/replys`).set(newReplys);
        }
    }


    onDelete() {
        const arrayPath = this.state.path.split('/');
        const componentIndex = arrayPath[arrayPath.length - 1];

        this.props.onDelete(componentIndex);
    }
    
    render () { 
        const editPath = `${this.state.path}/edit`;
        const deletePath = `${this.state.path}/delete`;
        const replyPath = `${this.state.path}/replys`;

        return (
            <BrowserRouter>
                <div>
                    <Route path='/'  render={() => <CommentElem path={this.state.path} data={this.state.body} />}/>

                    <Route exact path={editPath}  
                    render={() => (
                        <div>
                            <h1> Edit {this.state.path} </h1>
                            <Link to='/'>Go back</Link>
                        </div>
                     )}/>

                    <Route exact path={deletePath}
                    render={() => (
                        <div>
                            <Delete onDelete={this.onDelete}/>
                        </div>
                    )}/>

                    <Route exact path={replyPath}
                    render={() => (
                        <div>
                            <ReplyForm path={this.state.path} onSubmit={this.onReplyFormSubmit}/>
                            <Link to='/'>Go back</Link>
                        </div>
                    )}/>
                </div>
            </BrowserRouter>
             
        );
    }
}

export default Comment;