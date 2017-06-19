import {Wall} from './Wall';

export default function Game( init) {
  const clear = () => {
    return Array(rows).fill(0).map( row => Array(cols).fill(0))
  };
  const clearBoard = () => {
    cells = clear();
  };
  const setCell = (row, col, alive) => {
    cells[row][col] = alive?1:0;
  };
  const getBoard = () => {
    return cells;
  };
  const setBorder = () => {
    cells.forEach( (row, ndx, arr) => {
      if( ndx === 0 || ndx === arr.length-1){
        row.forEach( (cell, col) => { cells[ndx][col] = Wall();});
      } else {
        cells[ndx][0] = Wall();
        cells[ndx][arr[0].length-1] = Wall();
      }
    });
  };
  const setBoard = ( cell_map) => {
    cell_map.forEach( (row, ndx) => {
      row.forEach( (cell, col) => {
        if( cell){
          setCell( ndx, col, Wall());
        }
      });
    });
  };
  const populateLevel = () => {
    // weapons:club sword gun, food:apple sandwich full english breakfast,
    // monsters:goblin troll balrog, boss
  };

  // private init
  const that = {};
  const { cols, rows} = init;
  let cells = clear();

  // public exports
  that.clear = clearBoard;
  that.getBoard = getBoard;
  that.setBoard = setBoard;
  that.setCell = setCell;
  that.setBorder = setBorder;
  that.populateLevel = populateLevel;
  return that;
}
