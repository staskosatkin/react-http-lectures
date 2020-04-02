import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import './Posts.css';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        loading: false
    }

    componentDidMount() {
        console.log(this.props);

        this.setState({loading: true});

        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });

                this.setState({posts: updatedPosts, loading: false});
            })
            .catch(error => {
                console.log(error);
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    render () {
        let posts = <p style={{textAlign: "center"}}>Somthing went wrong!</p>

        if (!this.state.error) {

            if (this.state.loading) {
                posts = <p style={{textAlign: "center"}}>Loading...</p>;
            } else {
                posts = this.state.posts.map(post => {
                    return (
                        <Post   
                            key={post.id}  
                            title={post.title} 
                            author={post.author} 
                            clicked={() => this.postSelectedHandler(post.id)}/>
                    );
                });
            }
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:postId"} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;
