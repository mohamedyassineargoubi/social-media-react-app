import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", user.pseudo);
        data.append("userId", user._id);
        data.append("file", file);
        dispatch(uploadPicture(data, user._id));
    }
    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">

            <label htmlFor="file">Changer d'image</label>
            <input type="file" id="file" name="file" accept=".jpg ,jpeg ,png" onChange={e => setFile(e.target.files[0])}></input>
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    )
};

export default UploadImg;