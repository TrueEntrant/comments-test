import React, {Component} from 'react';
import Deleting from '../components/delete.dialog'

class Delete extends Component {
    constructor (props) {
        super(props);
        

        this.onDelete = this.onDelete.bind(this);
     }

    onDelete(e) {
        e.preventDefault();
        this.props.onDelete();
    }



    render() {
        return (
            <Deleting onSubmit={this.onDelete}/>
        );
    }
}

export default Delete;