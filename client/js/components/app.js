import React from 'react';
import RouteHandler from 'react-router'.RouteHandler;
import Header from '../components/header/app-header';

const App = React.createClass({

  getInitialState() {
    return {
      userId: 0,
      displayName: "",
      verified: false,
      verifyKey: "",
      avatar: "",
      messages: [],
      profile: {
        times: {},
        purpose: {},
        roles: {},
        lanes: {},
        about: ""
      },
      teams: [],
      games: {},
      counter: 0,
      answerHistory: [],
      ratings: {},
      temp: {
        rank: "unranked",
        matches: []
      }
    };
  },

  componentDidMount() {
    let context = this;
    $.get('/profile', response => {
      context.setState({
        userId: response.id,
        displayName: response.displayName,
        avatar: response.games.avatar,
        messages: response.messages,
        profile: response.profile,
        teams: response.teams,
        games: response.games,
        counter: response.counter,
        answerHistory: response.answerHistory,
        ratings: response.ratings,
        temp: response.temp
      });
    });
  },

  updateState(newState) {
    this.setState(newState);
  },

  render() {
    return (
      <div className="app" id="application">
        <Header displayName={this.state.displayName} avatar={this.state.avatar} teams={this.state.teams} />
        <div className="container">
          <RouteHandler
          userId={this.state.userId}
          displayName={this.state.displayName}
          avatar={this.state.avatar}
          messages={this.state.messages}
          profile={this.state.profile}
          teams={this.state.teams}
          games={this.state.games}
          counter={this.state.counter}
          answerHistory={this.state.answerHistory}
          ratings={this.state.ratings}
          temp={this.state.temp}
          updateState={this.updateState}
          />
        </div>
      </div>
    );
  }
});

module.exports = App;
