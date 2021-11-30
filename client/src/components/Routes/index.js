import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';



import React from 'react';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

const index = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/profil" exact component={Profil} />
                    <Route path="/trending" exact component={Trending} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default index;