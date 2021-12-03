
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import LeftNav from '../LeftNav';
import { dateParser } from '../Utils';
import FollowHandler from './FollowHandler';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [followingPopup, setfollowingPopup] = useState(false);
    const [followersPopup, setfollowersPopup] = useState(false);
    const user = useSelector(state => state.userReducer);
    const users = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    const handleUpdate = () => {
        dispatch(updateBio(user._id, bio))
        setUpdateForm(false)

    }

    return (
        <div>
            <div className="profil-container">
                <LeftNav />
                <h1>Profil de {user.pseudo}</h1>
                <div className="update-container">
                    <div className="left-part">
                        <h3>Photo de profil</h3>
                        <img src={user.picture} alt="user-pic" />
                        <UploadImg />

                    </div>
                    <div className="right-part">
                        <div className="bio-update">
                            <h3>Bio</h3>
                            {updateForm === false && (
                                <>
                                    <p onClick={() => setUpdateForm(!updateForm)}>{user.bio}</p>
                                    <button onClick={() => setUpdateForm(!updateForm)}>Valider Modification</button>
                                </>


                            )}
                            {updateForm === true && (
                                <>
                                    <textarea defaultValue={user.bio} type="text" onChange={e => setBio(e.target.value)}></textarea>
                                    <button onClick={handleUpdate}>Modifier Bio</button>
                                </>


                            )}
                        </div>
                        <h4>Membre depuis le : {dateParser(user.createdAt)}</h4>
                        <h5 onClick={() => setfollowingPopup(!followingPopup)}>Abonnements : {user.following ? user.following.length : ""}</h5>
                        <h5 onClick={() => setfollowersPopup(!followersPopup)}>Abonnées : {user.followers ? user.followers.length : ""}</h5>

                    </div>

                </div>






            </div>
            {followingPopup &&
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={() => setfollowingPopup(false)}>&#10005;</span>
                        <ul>
                            {users.map((userr) => {
                                for (let i = 0; i < user.following.length; i++) {
                                    if (userr._id === user.following[i]) {
                                        return (
                                            <li key={userr._id}>
                                                <img src={userr.picture} alt="user-pic" />
                                                <h4>{userr.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={userr._id} type={'suggestion'} />
                                                </div>

                                            </li>
                                        )
                                    }

                                }

                            })}
                        </ul>
                    </div>
                </div>
            }
            {followersPopup &&
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnées</h3>
                        <span className="cross" onClick={() => setfollowersPopup(false)}>&#10005;</span>
                        <ul>
                            {users.map((userr) => {
                                for (let i = 0; i < user.followers.length; i++) {
                                    if (userr._id === user.followers[i]) {
                                        return (
                                            <li key={userr._id}>
                                                <img src={userr.picture} alt="user-pic" />
                                                <h4>{userr.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={userr._id} type={'suggestion'} />
                                                </div>

                                            </li>
                                        )
                                    }

                                }

                            })}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateProfil;