import React from 'react';

export default class Hud extends React.Component {
  handleSpotlightToggle = (e) => {
    this.props.onSpotlightToggle();
  };
  render = () => {
    const style={ marginBottom:"10px"};
    return (
      <div style={style}>
        <button onClick={this.handleSpotlightToggle} >Spotlight</button>
      </div>
    );
  };
}
