import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
import { addSession, editSession, delSession, delSessionAll } from '../actions/index';

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
        editSession: session => dispatch(editSession(session)),
        delSession: session => dispatch(delSession(session)),
        delSessionAll: () => dispatch(delSessionAll())
    };
};

class ConnectedForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            edit: ""
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleEditChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        const id = uuid();
        this.props.addSession({ title, id });
        this.setState({
            title: ""
        });
    }

    handleEdit(event) {
        event.preventDefault();
        const { title, edit } = this.state;
        this.props.editSession({ title, edit });
        this.setState({
            title: "",
            edit: ""
        });
    }

    handleDelete(event) {
        event.preventDefault();
        const { title } = this.state;
        this.props.delSession({ title });
        this.setState({
            title: ""
        });
    }

    handleDeleteAll(event) {
        event.preventDefault();
        this.props.delSessionAll();
    }

    render() {
        const { title, edit } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={this.handleTitleChange}
                    />
                    <label htmlFor="edit">Edit As</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edit"
                      value={edit}
                      onChange={this.handleEditChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                  SAVE
                </button>
                <button onClick={this.handleEdit} className="btn btn-success btn-lg">
                  EDIT
                </button>
                <button onClick={this.handleDelete} className="btn btn-success btn-lg">
                  DELETE
                </button>
                <button onClick={this.handleDeleteAll} className="btn btn-success btn-lg">
                  DELETE ALL
                </button>
            </form>

        )
    }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;

