import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";

export const UPDATE_POST = "UPDATE_POST";

export const DELETE_POST = "DELETE_POST";


export const getPosts = (num) => {

    return (dispatch) => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post`
        })
            .then(res => {
                const array = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array })
            })
            .catch(err => console.log(err))
    }

}
export const postLike = (postId, userId) => {

    return (dispatch) => {
        axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
            data: { id: userId }
        })
            .then(res => {
                dispatch({ type: LIKE_POST, payload: { postId, userId } })
            })
            .catch(err => console.log(err))
    }

}
export const postDisLike = (postId, userId) => {

    return (dispatch) => {
        axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
            data: { id: userId }
        })
            .then(res => {
                dispatch({ type: DISLIKE_POST, payload: { postId, userId } })
            })
            .catch(err => console.log(err))
    }

}
export const updatePost = (postId, message) => {


    return (dispatch) => {
        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: { message }
        })
            .then(res => {
                dispatch({ type: UPDATE_POST, payload: { postId, message } })
            })
            .catch(err => console.log(err))
    }

}
export const deletePost = (postId) => {


    return (dispatch) => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`

        })
            .then(res => {
                dispatch({ type: DELETE_POST, payload: postId })
            })
            .catch(err => console.log(err))
    }

}