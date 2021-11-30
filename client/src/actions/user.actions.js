import axios from "axios";
export const GET_USER = "GET_USER";


export const getUser = (uid) => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/${uid}`
        })
            .then((res) => {
                console.log(res);
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

}