var Team = require('../models/team.model');
var User = require('../models/user.model');
var passport = require('passport');

module.exports = {

  register: function( req, res, next ) {
    var user, team;
    User.findOne({where: {id: req.session.passport.user}})
    .then(function(userData){
      user = userData;
    })
    .then(function(){
      Team.create({
        profile: req.body,
        teamCaptain: user.id,  // redundant, but this gets checked a lot and saves having to iterate over keys every time
        members: [{id: user.id, name: user.displayName, isAdmin: true}]
      })
      .then(function(teamData){
        team = teamData;
        user.teams.push({id: team.id, teamName: team.profile.teamName});
      })
      .then(function(){
        User.update({teams: user.teams}, {where: {id: req.session.passport.user}});
      })
      .then(function(){
        res.redirect('/#/');
      });
    });
  },

  updateProfile: function(req, res, next) {
      var getName = req.url.split('/')[3];
      console.log(getName);
      Team.findOne({
          where: {
            profile: {
              teamName: getName
            }
          }
        })
        .then(function(teamProfile) {
            var profile = req.body;
            profile["teamName"] = getName;
            console.log("profile")
            console.log(profile);
            Team.update({
                profile: profile
              }, {
                where: {
                  id: teamProfile.id
                }
              })
              .then(function() {
                console.log("something happened")
                res.redirect('/#/')
              })
          })
      },
      


  getProfile: function( req, res, next ){
    var getName = req.url.split('/')[3];
    console.log(getName);
    Team.findOne({where: {
      profile: {
        teamName: getName
      }
    }})
       .then(function (teamProfile) {        
        console.log('>>>>>>')
        console.log(teamProfile.profile);
        deepBoolean(teamProfile.profile);
        res.json(teamProfile);
     });
   },


  getAllProfiles: function( req, res, next ){
    Team.findAll()
    .then(function (teamProfiles) {
      res.json(teamProfiles);
    });
  },
  addAd: function(req, res, next) {
    Team.findById(req.body.id)
    .then(function(team){
      console.log(team);
    });
  },

  invite: function(req, res, next){

  },
  applytoteam: function(req, res, next){
    User.findOne({where: {id: req.session.passport.user}})
    .then(function(userData){
      user = userData;
    });
  },
  addtoteam: function(req, res, next){
    User.findOne({where: {id: req.body.userid}})
    .then(function(userData){
      Team.findById(req.body.teamid).then(function(teamData){
        team.members.push({id: user.id, name: user.displayName, isAdmin: true});
      });      
    });
  }
};


function deepBoolean(obj){
  if(typeof obj !== 'object') {
    if(obj === 'true' || obj === 'false'){
      return obj === 'true';
    }
  }
  if (Array.isArray(obj)) {
    obj.forEach(function(val){
      return deepBoolean(val);
    });
  } else if (typeof obj === 'object') {
    for (var key in obj){
      obj[key] = deepBoolean(obj[key]);
    }
  }
  return obj;
};