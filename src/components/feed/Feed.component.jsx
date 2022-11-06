import {useContext, useEffect, useState} from "react";
import axios from "axios";

import Share from "../share/Share.component"
import Post from "../postCard/Post.component";

import "./Feed.styles.css"

import {AuthContext} from "../../context/auth/Auth.context";

const Feed = ({username}) => {
    const [posts, setPosts] = useState([])
    const {user: {_id: userId, username: currentUsername}} = useContext(AuthContext)

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = username
                    ? await axios.get(`http://localhost:8080/api/posts/profile/${username}`)
                    : await axios.get(
                        `http://localhost:8080/api/posts/timeline/${userId}`
                    );

                setPosts(response.data);
            } catch (err) {
                console.log(err)
            }
        }

        fetchPosts();
    }, [username, userId]);



    useEffect(() => {
        setPosts(posts.sort((a, b) => a.createdAt - b.createdAt))
    }, [])


    return (
        <div className="feed">
            <div className="feedWrapper">

                {
                    username === currentUsername || !username ? <Share/> : ""
                }

                {posts.map(post => (<Post key={post._id} {...post}/>))}
            </div>
        </div>
    );
};

export default Feed;