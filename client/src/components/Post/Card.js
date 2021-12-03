import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { dateParser, isEmpty } from '../Utils';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const users = useSelector(state => state.usersReducer)
    const user = useSelector(state => state.userReducer)
    const [isUpdated, setIsUpdated] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const [textUpdate, setTextUpdate] = useState();
    const dispatch = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false)

    }
    useEffect(() => {
        !isEmpty(users[0]) && setIsLoading(false)
    }, [users])

    return (
        <li className="card-container">
            {
                isLoading ?
                    (
                        <i className="fas fa-spinner fa-spin"></i>
                    )
                    :
                    (
                        <>
                            <div className="card-left">
                                <img src={
                                    !isEmpty(users[0]) && (
                                        users.map((user) => {

                                            if (user._id === post.posterId) return user.picture
                                        }).join("")
                                    )
                                } alt="user-pic" />
                            </div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="pseudo">
                                        <h3>
                                            {
                                                !isEmpty(users[0]) && (
                                                    users.map((user) => {

                                                        if (user._id === post.posterId) return user.pseudo
                                                    }).join("")
                                                )
                                            }
                                        </h3>
                                        {post.posterId !== user._id &&
                                            <FollowHandler idToFollow={post.posterId} type={'card'} />
                                        }

                                    </div>
                                    <span>{dateParser(post.createdAt)}</span>
                                </div>
                                {isUpdated === false && <p>{post.message}</p>}
                                {isUpdated === true &&
                                    (
                                        <div className="update-post">
                                            <textarea
                                                defaultValue={post.message}
                                                onChange={e => setTextUpdate(e.target.value)}></textarea>
                                            <div className="button-container">
                                                <button className="btn" onClick={updateItem}>Valider modification</button>
                                            </div>
                                        </div>

                                    )
                                }
                                {post.picture && <img src={post.picture} alt="post-pic" className="card-pic" />}
                                {post.video && (
                                    <iframe
                                        width="500"
                                        height="300"
                                        src={post.video}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={post._id}
                                    ></iframe>
                                )}
                                {user._id === post.posterId &&
                                    (

                                        <div className="button-container">
                                            <div onClick={e => setIsUpdated(!isUpdated)}>
                                                <img src="./img/icons/edit.svg" alt="edit" />

                                            </div>
                                            <DeleteCard id={post._id} />

                                        </div>
                                    )




                                }
                                <div className="card-footer">
                                    <div className="comment-icon">
                                        <img src="./img/icons/message1.svg" alt="" onClick={() => setShowComments(!showComments)} />
                                        <span>{post.comments.length}</span>
                                    </div>
                                    <LikeButton post={post} key={post._id} />
                                    <img src="./img/icons/share.svg" alt="share" />
                                </div>
                                {showComments && <CardComments post={post} />}
                            </div>
                        </>
                    )
            }

        </li>
    );
};

export default Card;