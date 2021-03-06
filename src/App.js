import React, { Component } from 'react';
import Player from './components/Game/Player';
import Game from './components/Game/Game';
import Bubble from './components/Game/Bubble';
import {Board} from './components/Board';
import Spotlight from './components/Game/Spotlight';
import Hud from './components/Hud';
import Control from './components/Game/Control';
import {loadLevel} from './Actions';
import GameOverDlg from './components/GameOverDlg';
import './App.css';

class App extends Component {
  cell_width = 8; cell_height = 8;
  state = {
    map_cells : [],
    spot_centre_x: 20*this.cell_width-this.cell_width/2,
    spot_centre_y: 15*this.cell_height-this.cell_height/2,
    show_spotlight: true,
    show_bubbles: false,
    bubble_list: [],
    game_over: false
  };
  game_won = true;
  bubble_sequence_ndx = 0;
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
    this.startGame();
  };
  startGame = () => {
    const response = loadLevel();
    this.game.setBoard( response);
    this.game.setBorder();
    this.game.populateLevel();
    this.setState( {map_cells: this.game.getBoard(), game_over:false}, () => {
      this.control.start();
      this.player.reset();
    });
    // FIXME: github.io issues
    // .then( (response) => {
    //   this.game.setBoard( response);
    //   this.game.setBorder();
    //   this.game.populateLevel();
    //   this.setState( {map_cells: this.game.getBoard(), game_over:false}, () => {
    //     this.control.start();
    //     this.player.reset();
    //   });
    // });
  };
  bubbleFinished = () => {
    const nl = this.state.bubble_list.filter( ( item, ndx) => {
      return (ndx !== 0);
    });
    this.setState( {bubble_list: nl});
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
      let new_cells = this.state.map_cells;
      let new_bubble_list = this.state.bubble_list;
      switch( cell.getColour()){
        case 'limegreen':
          this.player.setCoords( row, col);
          const dh = cell.getHealthBoost();
          this.player.addHealth( dh);
          new_cells = this.state.map_cells.map( ( rows, irow) => {
            return rows.map( (cell, icol) => {
              if( row === irow && col === icol){
                return 0;
              }
              return cell;
            });
          });
          this.setState( {map_cells: new_cells});
          break;
        case 'yellow':
        case 'orange':
        case 'red':
          const pd = this.player.getHitDamage();
          const md = cell.getHitDamage();
          // set up damage bubbles
          if( this.state.show_bubbles){
            const bubble_top = this.state.spot_centre_y - this.spot_radius;
            const monster_left = this.state.spot_centre_x - 50;
            const player_left = this.state.spot_centre_x + 50;
            const monster_key = this.bubble_sequence_ndx++;
            const player_key = this.bubble_sequence_ndx++;
            new_bubble_list = [...this.state.bubble_list,
              <Bubble key={monster_key} top={bubble_top} left={monster_left}
                onFinished={this.bubbleFinished} text={pd} />,
              <Bubble key={player_key} top={bubble_top} left={player_left}
                onFinished={this.bubbleFinished} text={md} />
            ];
          }

          cell.takeDamage( pd);
          this.player.addHealth( -md);
          let game_over = false;
          if( cell.getHealth() < 1){
            if( cell.getName() === "Balrog"){
              // player won
              game_over = true;
              this.game_won = true;
              this.control.stop();
            }
            new_cells = this.state.map_cells.map( ( rows, irow) => {
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
          }
          if( this.player.getHealth() < 1){
            // player died
            game_over = true;
            this.game_won = false;
            this.control.stop();
          }
          this.setState( { map_cells: new_cells, bubble_list: new_bubble_list,
            game_over: game_over});
          break;
        case 'mediumorchid':
          this.player.setCoords( row, col);
          this.player.setWeapon( cell);
          const newcells = this.state.map_cells.map( ( rows, irow) => {
            return rows.map( (cell, icol) => {
              if( row === irow && col === icol){
                return 0;
              }
              return cell;
            });
          });
          this.setState( {map_cells: newcells});
          break;
        case 'black':
        default:
          break;
      }
    } else {
      this.player.setCoords( row, col);
    }
    let pc = this.player.getCoords();
    let x = (pc.col+1)*this.cell_width-this.cell_width/2; // this.state.spot_centre_x;
    let y = (pc.row+1)*this.cell_height-this.cell_height/2; // this.state.spot_centre_y;
    this.setState( {spot_centre_x: x, spot_centre_y: y});
  };
  spotlightToggle = () => {
    this.setState( {show_spotlight: !this.state.show_spotlight});
  };
  bubbleToggle = () => {
    this.setState( {show_bubbles: !this.state.show_bubbles});
  };
  handleYes = () => {
    this.setState( {game_over:false});
    this.startGame();
  };
  handleNo = () => {
    this.setState( {game_over:false});
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
    let game_over_dialogue = "";
    if( this.state.game_over){
      const message = this.game_won?"You Won":"You Lost";
      game_over_dialogue = <GameOverDlg onYes={this.handleYes} onNo={this.handleNo} message={message} />
    }
    return (
      <div className="App">
        <h2>Rogue-like Game</h2>
        {game_over_dialogue}
        <Hud onSave={this.handleSave} onSpotlightToggle={this.spotlightToggle}
          onBubbleToggle={this.bubbleToggle}
          player_level={this.player.getLevel()}
          player_xp={this.player.getXp()}
          player_health={this.player.getHealth()}
          player_weapon={this.player.getWeapon().getName()}/>
        <div className="board_container">
          {this.state.show_bubbles?this.state.bubble_list:""}
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
