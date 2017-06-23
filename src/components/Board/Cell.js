import React from 'react';
import PropTypes from 'prop-types';

export default class Cell extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    colour: PropTypes.string.isRequired
  };
  render = () => {
    const table_cell = {
      // border: "1px solid rgba( 127,127,127,0.8)",
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      backgroundColor: `${this.props.colour}`
    };
    return (
      <div style={table_cell}></div>
    );
  };
}
