import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { postDisLike, postLike } from '../../actions/post.actions';
const LikeButton = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch()
    const like = () => {

        dispatch(postLike(post._id, uid))
        setIsLiked(true)


    }
    const unLike = () => {

        dispatch(postDisLike(post._id, uid))
        setIsLiked(false)

    }
    useEffect(() => {

        if (post.likers.includes(uid)) setIsLiked(true)
        else setIsLiked(false)


    }, [uid, post.likers, isLiked])

    return (
        <div className="like-container">
            {uid === null &&
                <Popup trigger={<img src="./img/icons/heart.svg" alt="like" />} position={
                    ['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick>
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>
            }
            {uid && isLiked === false &&
                (
                    <img src="./img/icons/heart.svg" alt="like" onClick={like} />
                )}
            {uid && isLiked &&
                (
                    <img src="./img/icons/heart-filled.svg" alt="like" onClick={unLike} />
                )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;