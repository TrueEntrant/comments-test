import React, {Component} from 'react';
import Comment from '../logic/comment.logic'
import lodash from 'lodash';

class CommentsList extends Component {
    constructor (props) {
        super(props);

        this.temp = true;
        
        this.counter = 0;  
        this.onDelete = this.onDelete.bind(this); 
        this.ArraysCompare = this.ArraysCompare.bind(this); 
        
    }

    state = {
        path : this.props.path,
        comments : []
    }
    
    componentWillUnmount() {
        this.setState({
            path : '',
            comments : []
        })
    }

    ArraysCompare(stateArray, inputArray) {
        if(stateArray.length > inputArray.length) {
            return lodash.difference(stateArray, inputArray)
        } else {
            return lodash.difference(inputArray, stateArray)
        }
    }


    componentWillUpdate() {
        
        this.counter = 0;
        const check = !!this.ArraysCompare(this.props.commentsArray,this.state.comments)[0];
        if(check || this.temp) {
            this.temp = false;
            this.setState({
                comments : [...this.props.commentsArray]
            })
        }
    }

    

    onDelete(index, path) {
        if(!path) {
            console.log(this.state.path);
            this.props.onDelete(index, this.state.path);
        }
        else {
            console.log(path);
            this.props.onDelete(index, path);
        }
    }

    render() {
    const path = this.props.path || '';
    const ulClass = this.props.ulClass || 'main';
    
    return (
        <ul className={ulClass}>
        {
            this.state.comments.map((item, i) => (
                <ReplyCreator 
                    onReply={this.props.onReply}
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
            onReply={props.onReply}
            onDelete={props.onDelete}
            body={props.body}
            path={path}
        />
        {
        props.body.replys ?
        <CommentsList 
            onDelete={props.onDelete}
            onReply={props.onReply}
            ulClass='second'
            path={`${path}/replys`}
            commentsArray={props.body.replys} />
        : null
        }
    </li>
);
}

 
export default CommentsList;