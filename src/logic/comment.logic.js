import React, { Component } from 'react';
import '../styles/Comment.css'
import CommentElem from '../components/comment.elem'
import {BrowserRouter , Route, Link} from 'react-router-dom';
import ReplyFormLogic from './reply.form.logic';
import firebase from 'firebase/app';
import Delete from './delete.comment';
import Redirect from 'react-router-dom/Redirect';


class Comment extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            path : this.props.path,
            body : this.props.body,
            editTextValue: this.props.body.text
        }
        this.onReplyFormSubmit = this.onReplyFormSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);

    }

    componentWillMount() {
        const storage = firebase.storage().ref();

        storage.child(`${this.state.body.avatar}`).getDownloadURL().then((url) => {
            const newBody = this.state.body;
            newBody.avatarIMG = url;
          

                this.setState({
                    body: newBody
                })
           
        }).catch((error) => {
            console.log(error);
        });

    }
    componentWillUnmount() {
        
        this.setState({
            path : '',
            body : '',
            editTextValue: ''
        })
    }


    onReplyFormSubmit(newReply) {

        this.props.onReply(newReply,this.state.path );
        // const storage = firebase.storage().ref().child("/authors.avatars");
        // // console.log(newComment.avatar.name);
        
        // storage.child(`${this.state.path}/replys`)
        // .put(newReply.avatar)
        // .then((res) => {
        //     newReply.avatar = res.metadata.fullPath;
             
        //     const db = firebase.database().ref().child('/comments');

        //     if(this.state.body.replys) {
        //         const newReplys = [...this.state.body.replys, newReply];
        //         db.child(`${this.state.path}/replys`).set(newReplys);

        //         const newBody = this.state.body;
        //         newBody.replys = newReplys;
        //         this.setState({
        //             body : newBody
        //         })
        //     }
        //     else {
        //     const newReplys = [...[], newReply];
        //         db.child(`${this.state.path}/replys`).set(newReplys);

        //         const newBody = this.state.body;
        //         newBody.replys = newReplys;
        //         this.setState({
        //             body : newBody
        //         })
        //     }
        // })
        // .catch(err => console.log(err));
    }


    onEditChange(event, a) {

        this.setState({
                editTextValue: event.target.value
            })
    }

    onEditSubmit() {
        const db = firebase.database().ref().child('/comments');
        const newBody = this.state.body;
        newBody.text = this.state.editTextValue;
        this.setState({
            body: newBody
        })
        db.child(`${this.state.path}/text`).set(this.state.editTextValue);
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
                    <Route exact path='/'  render={() => 
                        <CommentElem 
                        
                        path={this.state.path} 
                        data={this.state.body} 
                    />}/>

                    <Route exact path={editPath}  
                    render={() => 
                        <CommentElem 
                        editValue={this.state.editTextValue}
                        onSubmit={this.onEditSubmit}
                        onChange={this.onEditChange}
                        path={this.state.path} 
                        data={this.state.body} 
                    />}/>

                    <Route exact path={deletePath}
                    render={() => {
                        return  (
                        <div>
                        <CommentElem 
                        
                        path={this.state.path} 
                        data={this.state.body} 
                        />
                        <Delete onDelete={this.onDelete}/>
                        </div>
                        )
                       }}/>

                    <Route exact path={replyPath}
                        render={() => (
                            <div>
                                <CommentElem 
                                    path={this.state.path} 
                                    data={this.state.body} 
                                />
                                <ReplyFormLogic 
                                    path={this.state.path} 
                                    onSubmit={this.onReplyFormSubmit}
                                />
                                <Link to='/'>Go back</Link>
                            </div>
                        )}/>
                        {/* <Redirect from='?comment=' to='/' /> */}
                </div>
            </BrowserRouter>
             
        );
    }
}

export default Comment;