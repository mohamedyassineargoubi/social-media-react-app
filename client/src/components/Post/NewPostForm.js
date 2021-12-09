import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty, timeStampParser } from '../Utils';

const NewPostForm = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const user = useSelector(state => state.userReducer);
    const errors = useSelector(state => state.errorsReducer.postErrors);
    const dispatch = useDispatch()
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setVideo('')

    }
    const handlePost = async () => {
        if (message || postPicture || video) {
            const data = new FormData();
            data.append("posterId", user._id);
            data.append("message", message);
            if (file) data.append("file", file);
            data.append("video", video);
            await dispatch(addPost(data))
            dispatch(getPosts())
            cancelPost()
        } else {
            alert('Veuillez entrer un message')
        }

    }
    const cancelPost = () => {
        setVideo('');
        setPostPicture('');
        setFile('');
        setMessage('');
    }
    const handleVideo = () => {
        let findLink = message.split(" ");
        for (let i = 0; i < findLink.length; i++) {
            if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
                let embed = findLink[i].replace('watch?v=', 'embed/');
                setVideo(embed.split('&')[0])
                findLink.splice(i, 1)
                setMessage(findLink.join(" "))
                setPostPicture('')
            }
        }
    }
    useEffect(() => {
        if (isEmpty(user)) setIsLoading(false)
        handleVideo()
    }, [user, message, video])



    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        <p>
                            <span>
                                {user.following ? user.following.length : 0}
                            </span> Abonnement{user.following && user.following.length > 1 ? "s" : null}
                        </p>
                        <p>
                            <span>
                                {user.followers ? user.followers.length : 0}
                            </span> Abonnée{user.followers && user.followers.length > 1 ? "s" : null}
                        </p>
                    </div>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={user.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Quoi de neuf ?"
                            onChange={e => setMessage(e.target.value)}
                            value={message}


                        ></textarea>
                        {message || postPicture || video.length > 20 ?
                            (
                                <li className="card-container">
                                    <div className="card-left">
                                        <img src={user.picture} alt="user-img" />
                                    </div>
                                    <div className="card-right">
                                        <div className="card-header">
                                            <div className="pseudo">
                                                <h3>{user.pseudo}</h3>
                                            </div>
                                            <span>{timeStampParser(Date.now())}</span>
                                        </div>
                                        <div className="content">
                                            <p>{message}</p>
                                            <img src={postPicture} alt="" />
                                            {video &&
                                                (
                                                    <iframe
                                                        src={video}
                                                        frameBorder="0"
                                                        allow="accelorometer; autoplay; clipboard-write;encrypted-media; gyroscope ;picture-in-picture"
                                                        allowFullScreen
                                                        title={video}
                                                    ></iframe>

                                                )}
                                        </div>

                                    </div>
                                </li>
                            ) : null}


                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) &&
                                    <>
                                        <img src="./img/icons/picture.svg" alt="img" />
                                        <input type="file" name="file" id="file-upload" accept=".jpg, .jpeg, .png"
                                            onChange={e => handlePicture(e)}
                                        />
                                    </>

                                }
                                {video &&
                                    (
                                        <button onClick={() => setVideo('')}>Supprimer vidéo</button>
                                    )
                                }
                            </div>
                            {!isEmpty(errors.format) && <p>{errors.format}</p>}
                            {!isEmpty(errors.maxSize) && <p>{errors.maxSize}</p>}
                            <div className="btn-send">
                                {message || postPicture || video.length > 20 ?
                                    (
                                        <button className="cancel" onClick={cancelPost}>Annuler message</button>
                                    ) : (null)
                                }

                                <button className="send" onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>


                </>
            )}
        </div>

    );
};

export default NewPostForm;