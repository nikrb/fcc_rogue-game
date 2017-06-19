import React, { Component } from 'react';
import Player from './components/Game/Player';
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
    spot_centre_x: 20*this.cell_width-this.cell_width/2,
    spot_centre_y: 15*this.cell_height-this.cell_height/2,
    show_spotlight: true
  };
  spot_radius = 3* this.cell_width;
  row_count = 30;
  col_count = 40;
  player = Player( { row: this.row_count/2, col: this.col_count/2});
  game = Game( {rows:this.row_count, cols:this.col_count});
  control = Control();
  componentWillMount = () => {
    window.addEventListener( 'game_tick', this.handleTick);
  };
  componentWillUnmount = () => {
    window.removeEventListener( 'game_tick', this.handleTick);
    this.game.willUnmount();
  };
  componentDidMount = () => {
    loadLevel()
    .then( (response) => {
      this.game.setBoard( response);
      this.game.setBorder();
      this.game.populateLevel();
      this.setState( {map_cells: this.game.getBoard()}, () => {
        this.control.start();
      });
    });
  };
  handleTick = () => {
    const ikeys = this.control.getKeys();
    let {row,col} = this.player.getCoords();
    if( ikeys.left) col -= 1;
    if( ikeys.right) col += 1;
    if( ikeys.up) row -= 1;
    if( ikeys.down) row += 1;
    const cell = this.state.map_cells[row][col];
    if( cell){
      switch( cell.getColour()){
        case 'green':
          this.player.setCoords( row, col);
          const dh = cell.getHealthBoost();
          this.player.addHealth( dh);
          const th = this.player.getHealth();
          console.log( `player health add[${dh}] total[${th}]`);
          const new_cells = this.state.map_cells.map( ( rows, irow) => {
            return rows.map( (cell, icol) => {
              if( row === irow && col === icol){
                return 0;
              }
              return cell;
            });
          });
          this.setState( {map_cells: new_cells});
          break;
        case 'orange':
          const pd = this.player.getHitDamage();
          const md = cell.getHitDamage();
          cell.takeDamage( pd);
          this.player.addHealth( -md);
          if( this.player.getHealth() < 1){
            // player died
          }
          if( cell.getHealth() < 1){
            const new_cells = this.state.map_cells.map( ( rows, irow) => {
              return rows.map( (cell, icol) => {
                if( row === irow && col === icol){
                  return 0;
                }
                return cell;
              });
            });
            this.player.setCoords( row, col);
            const xp = cell.getXpBoost();
            this.player.addXp( xp);
            this.setState( {map_cells: new_cells});
          }
          break;
        case 'black':
        default:
          break;
      }
    } else {
      this.player.setCoords( row, col);
    }
    let pc = this.player.getCoords();
    let x = pc.col*this.cell_width-this.cell_width/2; // this.state.spot_centre_x;
    let y = pc.row*this.cell_height-this.cell_height/2; // this.state.spot_centre_y;
    this.setState( {spot_centre_x: x, spot_centre_y: y});
  };
  spotlightToggle = () => {
    this.setState( {show_spotlight: !this.state.show_spotlight});
  };
  render() {
    const {spot_centre_x, spot_centre_y} = this.state;
    const spotlight = this.state.show_spotlight;
    const player_coords = this.player.getCoords();
    const board_cells = this.state.map_cells.map( ( rows, irow) => {
      return rows.map( (cell, icol) => {
        if( player_coords.row === irow && player_coords.col === icol){
          return this.player;
        }
        return cell;
      });
    });
    return (
      <div className="App">
        <h2>Map Editor</h2>
        <Hud onSave={this.handleSave} onSpotlightToggle={this.spotlightToggle}
          player_level={this.player.getLevel()}
          player_xp={this.player.getXp()}
          player_health={this.player.getHealth()}/>
        <div className="board_container">
          <Board cells={board_cells}
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
