import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.fetchPost(postId);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () =>  { this.props.history.push("/")});
    }

    render() {
        const { post } = this.props;
        if (post) {
            return (
                <div>
                    <Link to="/" className="btn btn-primary"> Back </Link>
                    <button
                        className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete post
                    </button>
                    <div className="post-container">
                        <h3>{post.title}</h3>
                        <h6>Categories: {post.categories}</h6>
                        <p>{post.content}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }   
}

function mapStateToProps({ posts }, ownProps) {
    return {post: posts[ownProps.match.params.id]};

}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);