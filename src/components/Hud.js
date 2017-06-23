import React from 'react';
import Legend from './Board/Legend';

export default class Hud extends React.Component {
  handleSpotlightToggle = (e) => {
    this.props.onSpotlightToggle();
  };
  handleBubbleToggle = (e) => {
    this.props.onBubbleToggle();
  };
  render = () => {
    const style={ marginBottom:"10px"};
    const buttons={
      display: "flex",
      justifyContent: "space-around"
    }
    return (
      <div style={style}>
        <div>
          Player Level: {this.props.player_level} XP: {this.props.player_xp} &nbsp;
          Health: {this.props.player_health}&nbsp; Weapon: {this.props.player_weapon}
        </div>
        <Legend />
        <div style={buttons}>
          <button onClick={this.handleSpotlightToggle} >Spotlight</button>
          <button onClick={this.handleBubbleToggle} title="Damage bubbles (experimental)" >
            Bubbles
          </button>
        </div>
      </div>
    );
  };
}
