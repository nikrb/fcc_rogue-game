import React, { Component } from 'react';
import Game from './components/Game/Game';
import {Board} from './components/Board';
import Spotlight from './components/Game/Spotlight';
import Hud from './components/Hud';
import Control from './components/Game/Control';
import {loadLevel} from './Actions';
import './App.css';

class App extends Component {
  cell_width = 8; cell_height = 8;
  state = {
    map_cells : [],
    spot_centre_x: 20*this.cell_width,
    spot_centre_y: 15*this.cell_height,
    show_spotlight: true
  };
  spot_radius = 3* this.cell_width;
  row_count = 30;
  col_count = 40;
  game = Game( {rows:this.row_count, cols:this.col_count});
  control = Control();
  componentWillMount = () => {
    window.addEventListener( 'keydown', this.handleKeydown);
  };
  componentWillUnmount = () => {
    window.removeEventListener( 'keydown', this.handleKeydown);
    this.game.willUnmount();
  };
  componentDidMount = () => {
    loadLevel()
    .then( (response) => {
      this.game.setBoard( response);
      this.game.setBorder();
      this.game.populateLevel();
      this.setState( {map_cells: this.game.getBoard()});
    });
  };
  handleKeydown = (e) => {
    const ikeys = this.control.getKeys();
    let x = this.state.spot_centre_x;
    let y = this.state.spot_centre_y;
    if( ikeys.left) x -= this.cell_width;
    if( ikeys.right)x += this.cell_width;
    if( ikeys.up)   y -= this.cell_height;
    if( ikeys.down) y += this.cell_height;
    this.setState( {spot_centre_x: x, spot_centre_y: y});
  };
  spotlightToggle = () => {
    this.setState( {show_spotlight: !this.state.show_spotlight});
  };
  render() {
    const {spot_centre_x, spot_centre_y} = this.state;
    const spotlight = this.state.show_spotlight;
    return (
      <div className="App">
        <h2>Map Editor</h2>
        <Hud onSave={this.handleSave} onSpotlightToggle={this.spotlightToggle}/>
        <div className="board_container">
          <Board cells={this.state.map_cells}
            cell_width={this.cell_width} cell_height={this.cell_height}/>
          <Spotlight show_spotlight={spotlight}
            x={spot_centre_x} y={spot_centre_y}
            r={this.spot_radius}
            width={this.col_count*this.cell_width}
            height={this.row_count*this.cell_height} />
        </div>
      </div>
    );
  }
}

export default App;
