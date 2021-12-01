import React from 'react';
import { useSelector } from 'react-redux';
import LeftNav from '../LeftNav';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
    const user = useSelector(state => state.userReducer);

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

                </div>






            </div>
        </div>
    );
};

export default UpdateProfil;