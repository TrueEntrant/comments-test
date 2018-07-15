import React, {Component} from 'react';
import Comment from '../logic/comment.logic'
import firebase from 'firebase/app';


class CommentsList extends Component {
    constructor (props) {
        super(props);

        this.counter = 0;  
        this.onDelete = this.onDelete.bind(this);    

    }

    state = {
        ReplyArray : this.props.commentsArray
    }

    onDelete(index) {
        const db = firebase.database().ref().child('/comments');

        this.props.commentsArray.splice(index, 1);

        console.log(this.props.commentsArray);
        if(this.props.path) {
            db.child(this.props.path).set(this.props.commentsArray);
        } else {
            debugger;
            db.set(this.props.commentsArray);
        }
    }

    render() {
    const path = this.props.path || '';
    const ulClass = this.props.ulClass || 'main'
    

    return (
        <ul className={ulClass}>
        {
            this.props.commentsArray.map((item, i) => (
                <ReplyCreator 
                    onDelete={this.onDelete}
                    body={item} 
                    key={i} 
                    count={this.counter++} 
                    path={path}
                />
            ))
        }
        </ul>
    );
};
}

const ReplyCreator = (props) => {
    let path = `${props.path}/${props.count}`;
    
    return(
    <li>
        <Comment 
            onDelete={props.onDelete}
            body={props.body}
            path={path}
        />
        {
        props.body.replys ?
        <CommentsList 
            ulClass='second'
            path={`${path}/replys`}
            commentsArray={props.body.replys} />
        : null
        }
    </li>
);
}

 
export default CommentsList;