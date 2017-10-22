import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPosts(){
        return _.map(this.props.posts,
            (post) => {
                let post_link = `/posts/${post.id}`;
                return (
                    <li className="list-group-item" key={post.id}>
                        <Link to={post_link}>
                            {post.title}
                        </Link>
                    </li>
                );
            }
        );
    }

    render() {
        return (
            <div>
                <div className="pull-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts index</h3>
                <ul className="list-group post-list">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStatetoProps(state) {
    return {posts: state.posts};
}

export default connect(mapStatetoProps, { fetchPosts })(PostsIndex);