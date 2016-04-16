import React from 'react';
import _ from 'lodash';

const RecUtil = {
  objectToString(obj) {
    let string = [];
    _.filter(obj, key =>
      return key === true)
    return string.toString();
  },

  calculateMatchScore(pos, n) { // lower bound wilson score confidence interval of a bernouilli parameter
    let z = 1.96,
      phat = 1 * pos / n;
    // z = 1.96; // 1.96 = 95%
    // phat = 1 * pos / n;
    return (phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n);
  },

  calculateTeamMatch(user, team) { // currently not in use, but this is where you could differentiate team algorithm further

    let target = {
      collaborative: team[collaborative],
      boundaries: team[boundaries],
      loud: team[loud],
      committed: team[committed],
      ambition: team[ambition],

      aggressive: team[aggressive],
      dominance: (Math.abs(team[aggressive]) * -1),
      // adaptable: //+ makes it nonfactor. -, check. make this a message, //<-- not too much total rigidness
      blunt: team[blunt] // check for tiers,     //<-- not too much total?
        // brute: // message,
    };
  },

  checkIfChecked(obj) { // don't iterate unless something's checked
    return !(_.every(obj, function(elm) {
      return elm === false;
    }) || _.every(obj, function(elm) {
      return elm === true;
    }));
  },

  propFilter(userList, property, context) {
    let filters = [];
    _.forEach(context.props[property], prop => {
      if (prop === true) {
        filters.push(key);
      }
    })

    // for (var key in context.props[property]) {
    //   if (context.props[property][key] === true) filters.push(key);
    // }
    return _.filter(userList, user => {
      let filterTest = false;
      _.map(filters, function(elm) {
        if (user.profile[property][elm] === true) {
          filterTest = true;
        }
      });
      return filterTest;
    });
  },

  teamsCaptained(teams, id) => {
    let teamNodes = [];
    _.map(teams, function(myTeam) {
      if (myTeam.teamCaptain === id) {
        teamNodes.push(<Option value={myTeam.profile.teamName}> {myTeam.profile.teamName}</Option>)
      }
    })
    return teamNodes
  },

  whiteBox: {
    backgroundColor: 'white',
    padding: '25',
    margin: '25',
    border: 'solid black 1px',
    height: '250',
    width: '450',
    display: 'inline-block'
  },
  headshot: {
    backgroundColor: 'white',
    padding: '10',
    height: '200',
    width: '200',
    float: 'left',
    textAlign: 'center'
  },
  stats: {
    backgroundColor: 'white',
    padding: '25',
    height: '200',
    width: '200',
    display: 'block',
    float: 'right',
    textAlign: 'center'
  },
  chart: {
    backgroundColor: 'white',
    padding: '25',
    height: '200',
    width: '200',
    display: 'block',
    float: 'right',
    textAlign: 'center'
  }
};

export RecUtil;
