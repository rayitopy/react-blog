import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions'

class PostsNew extends Component {
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div  className={className}>
                <label htmlFor={field.fieldId}>{field.label}</label>
                <input
                    id={field.fieldId}
                    type={field.type}
                    className='form-control'
                    {...field.input}/>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
       
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    fieldId="title"
                    label="Title"
                    name="title"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    fieldId="categories"
                    label="Categories"
                    name="categories"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    fieldId="postContent"
                    label="Post content"
                    name="content"
                    type="text"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter a title!";
    }

    if (values.title && !values.title.length > 3) {
        errors.title = "Title must have 3 characters at least!";
    }

    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content please';
    }

    //validate the imputs from values

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
);