import axios from 'axios';
import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/postReducer';
import {
    ADD_POST,
    apiUrl,
    DELETE_POST,
    FIND_POST,
    POST_LOADED_FAIL,
    POST_LOADED_SUCCESS,
    UPDATE_POST,
} from './constains';

export const PostContext = createContext();

function PostProvider({ children }) {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    // Get all posts
    const getPosts = async () => {
        try {
            const res = await axios.get(`${apiUrl}/posts`);
            if (res.data.success) {
                dispatch({ type: POST_LOADED_SUCCESS, payload: res.data.posts });
            }
        } catch (error) {
            dispatch({ type: POST_LOADED_FAIL });
        }
    };

    // Add post
    const addPost = async (newPost) => {
        try {
            const res = await axios.post(`${apiUrl}/posts`, newPost);
            if (res.data.success) {
                dispatch({ type: ADD_POST, payload: res.data.post });
                return res.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' };
        }
    };

    // Delete post
    const deletePost = async (postId) => {
        try {
            const res = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (res.data.success) {
                dispatch({ type: DELETE_POST, payload: postId });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Find post when user is updating post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        dispatch({ type: FIND_POST, payload: post });
    };

    // Update post
    const updatePost = async (updatedPost) => {
        try {
            const res = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
            if (res.data.success) {
                dispatch({ type: UPDATE_POST, payload: res.data.post });
                return res.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' };
        }
    };

    // Post context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal,
    };

    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
}

export default PostProvider;
