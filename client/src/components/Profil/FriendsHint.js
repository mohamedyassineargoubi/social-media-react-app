import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import FollowHandler from './FollowHandler';

const FriendsHint = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([])
    const user = useSelector(state => state.userReducer);
    const users = useSelector(state => state.usersReducer);

    useEffect(() => {
        const notFriendList = () => {
            let array = [];
            users.map((userr) => {
                if (userr._id !== user._id && !userr.followers.includes(user._id)) {
                    return array.push(userr._id);

                }
            })
            array.sort(() => 0.5 - Math.random())
            if (window.innerHeight > 780) {
                array.length = 5
            } else if (window.innerHeight > 720) {
                array.length = 4
            }
            else if (window.innerHeight > 615) {
                array.length = 2
            }
            else if (window.innerHeight > 540) {
                array.length = 1
            } else {
                array.length = 0
            }
            setFriendsHint(array);
            console.log("array", array);

        }
        if (playOnce && !isEmpty(users[0]) && user._id) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }

    }, [user, users])

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ?
                (
                    <div className="icon">
                        <i className="fas fa-spinner fa-pulse">

                        </i>

                    </div>


                ) :
                (
                    <ul>
                        {friendsHint && friendsHint.map((friend) => {
                            for (let i = 0; i < users.length; i++) {
                                if (friend === users[i]._id) {
                                    return (
                                        <li className="user-hint" key={friend}>
                                            <img src={users[i].picture} alt="user-pic" />
                                            <p>{users[i].pseudo}</p>
                                            <FollowHandler idToFollow={users[i]._id} type={'suggestion'} />
                                        </li>
                                    )
                                }
                            }
                        })}
                    </ul>
                )
            }

        </div>
    );
};

export default FriendsHint;