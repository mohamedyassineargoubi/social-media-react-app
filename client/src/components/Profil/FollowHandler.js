import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

const FollowHandler = ({ idToFollow, type }) => {
    const user = useSelector(state => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(user._id, idToFollow))
        setIsFollowed(true);

    }
    const handleUnFollow = () => {
        dispatch(unfollowUser(user._id, idToFollow))
        setIsFollowed(false);
        
    }
    useEffect(() => {
        if (!isEmpty(user.following)) {

            if (user.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
            
        }

    }, [user, idToFollow])
    return (
        <>
            {isFollowed && !isEmpty(user) &&
                <span onClick={handleUnFollow}>
                    {type === "suggestion" && <button className="unfollow-btn" >Abonné</button>}
                    {type === "card" && <img src="./img/icons/checked.svg" alt="check" />}

                </span>
            }
            {isFollowed === false && !isEmpty(user) &&
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button className="follow-btn" >Suivre</button>}
                    {type === "card" && <img src="./img/icons/check.svg" alt="check" />}
                </span>
            }

        </>
    );
};

export default FollowHandler;