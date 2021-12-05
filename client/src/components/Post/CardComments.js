
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { isEmpty, timeStampParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const CardComments = ({ post }) => {
    const users = useSelector(state => state.usersReducer)
    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const [text, setText] = useState("");


    const handleComment = (e) => {
        e.preventDefault();
        if (text) {

            dispatch(addComment(post._id, user._id, text, user.pseudo))

            setText('');


        }
    };
    return (
        <div className="comments-container">
            {post.comments.map(comment => {
                return (
                    <div className={comment.commenterId === user._id ? "comment-container client" : "comment-container"} key={comment._id}>
                        <div className="left-part">
                            <img src={
                                !isEmpty(users[0]) && (
                                    users.map((user) => {

                                        if (user._id === comment.commenterId) return user.picture
                                    }).join("")
                                )
                            } alt="commenter-pic" />

                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPseudo}</h3>
                                    {comment.commenterId !== user._id &&
                                        <FollowHandler idToFollow={comment.commenterId} type="card" />
                                    }

                                </div>
                                <span>{timeStampParser(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>

                    </div>
                )



            })}
            {user._id &&
                (
                    <form onSubmit={handleComment} className="comment-form">
                        <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Laisser un commentaire" />
                        <br />
                        <input type="submit" value="Envoyer" />

                    </form>

                )}

        </div>
    );
};

export default CardComments;