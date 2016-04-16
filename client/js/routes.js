/*
 OUR ROUTES ARE NOW DEFINED WITH THIS FILE.
 THIS HELPS USE MAINTAIN ALL OUR ROUTES WITHIN
 ONE FILE & IT MAKES MAIN.JS MORE READABLE.
 */
import React from "react";
import Router from "react-router";
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;

/* COMPONENTS TO RENDER DEPENDING ON THE REQUESTED ROUTE */

import App from "./components/app";
import Profile from "./components/profile/profile"; //User's profile
import UserProfile from "./components/user/viewProfile"; //Viewing other users
import TeamRegistration from "./components/team/team-registration"; //Making a team
import TeamProfile from "./components/team/team-profile"; //Viewing a team
import TeamUpdateForm from "./components/team/team-update-form";
import FindPlayers from "./components/recruitment/findPlayers"; //Finding players/teams
import Messages from "./components/profile/messages";
import Settings from "./components/settings/settings"; //Changing email/password
import About from "./components/settings/about"; //About page
const NotFound = React.createClass({
    render() {
        return <h2>NOT FOUND</h2>;
    }
});

module.exports = (

    <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Profile} />
    <Route name="profile" path="/profile" handler={Profile}/>
    <Route name="user-profile" path="/user/:username" handler={UserProfile}/>
    <Route name="teamregistration" path="/teamregistration" handler={TeamRegistration}/>
    <Route name="teamprofile" path="/team/:teamname" handler={TeamProfile}/>
    <Route name="teamupdateform" path="/teamupdate" handler={TeamUpdateForm}/>
    <Route name="findplayers" path="/findplayers" handler={FindPlayers}/>
    <Route name="messages" path="/messages" handler={Messages}/>
    <Route name="settings" path="/settings" handler={Settings}/>
    <Route name="about" path="/about" handler={About}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>

);
