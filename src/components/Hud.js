import React from 'react';

export default class Hud extends React.Component {
  handleSpotlightToggle = (e) => {
    this.props.onSpotlightToggle();
  };
  render = () => {
    const style={ marginBottom:"10px"};
    return (
      <div style={style}>
        Player Level: {this.props.player_level} XP: {this.props.player_xp} &nbsp;
        Health: {this.props.player_health}&nbsp; Weapon: {this.props.player_weapon}&nbsp;
        <button onClick={this.handleSpotlightToggle} >Spotlight</button>
      </div>
    );
  };
}
