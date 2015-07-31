var React = require('react/addons');
var Router = require('react-router');
var ReactBtn = require('react-btn-checkbox');
var Checkbox = ReactBtn.Checkbox;

var belle = require('belle');
Button = belle.Button;
TextInput = belle.TextInput;


var BioForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    initialBio: React.PropTypes.object.isRequired,
    updateState: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      times: {
        "weekdays": false,
        "weeknights": false,
        "weekends": false
      },
      purpose: {
        "casual": false,
        "ranked": false,
        "3v3": false,
        "5v5": false
      },
      lanes: {
        "top": false,
        "mid": false,
        "bot": false,
        "jungle": false
      },
      roles: {
        "assassin": false,
        "mage": false,
        "marksman": false,
        "bruiser": false,
        "support": false,
        "tank": false
      },
      about: "",
      tagLine: ""
    };
  },
  componentWillReceiveProps: function(props){
    this.setState({
      times: props.initialBio.times,
      purpose: props.initialBio.purpose,
      lanes: props.initialBio.lanes,
      roles: props.initialBio.roles,
      about: props.initialBio.about,
      tagLine: props.initialBio.tagLine
    })
  },
  handleSubmit: function(e) {
    var self = this;
    e.preventDefault();
    $.post("/profile", {
      times: this.state.times,
      purpose: this.state.purpose,
      lanes: this.state.lanes,
      roles: this.state.roles,
      about: this.state.about,
      tagLine: this.state.tagLine
    }, function(data){
      self.props.updateState(data);
      $('#tabs a:first').tab('show');
    });
  },
  render: function() {
    return (
      <form className="form-horizontal" id="bioform" onSubmit={this.handleSubmit}>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Tagline</label>
          <div className="col-sm-offset-3 col-md-offset-2">
            <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text."
             allowNewLine={ true } name="tagLine" valueLink={this.linkState('tagLine')} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">About</label>
          <div className="col-sm-offset-3 col-md-offset-2">
            <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text."
             allowNewLine={ true } name="about" valueLink={this.linkState('about')} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Times Available</label>
          <div className="col-sm-9 col-md-10">
            <Checkbox
            label = ""
            options={this.state.times}
            onChange={this.setState.bind(this)}
            bootstrap />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Playstyle</label>
          <div className="col-sm-9 col-md-10">
            <Checkbox
            label = ""
            options={this.state.purpose}
            onChange={this.setState.bind(this)}
            bootstrap />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Lanes</label>
          <div className="col-sm-9 col-md-10">
            <Checkbox
            label = ""
            options={this.state.lanes}
            onChange={this.setState.bind(this)}
            bootstrap />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3 col-md-2">Roles</label>
          <div className="col-sm-9 col-md-10">
            <Checkbox
            label = ""
            options={this.state.roles}
            onChange={this.setState.bind(this)}
            bootstrap />
          </div>
        </div>



        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-2">
            <Button primary type="submit" value="Submit">Submit</Button>
          </div>
        </div>

      </form>
    )
  }
});

module.exports = BioForm;
