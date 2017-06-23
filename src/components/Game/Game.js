import {Wall} from './Wall';
import Food from './Food';
import {Goblin,Troll,Balrog} from './Monster';
import Weapon from './Weapon';

export default function Game( init) {
  const clear = () => {
    return Array(rows).fill(0).map( row => Array(cols).fill(0))
  };
  const clearBoard = () => {
    cells = clear();
  };
  const setCell = (row, col, obj) => {
    cells[row][col] = obj;
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
    clearBoard();
    cell_map.forEach( (row, ndx) => {
      row.forEach( (cell, col) => {
        if( cell){
          setCell( ndx, col, Wall());
        }
      });
    });
  };
  const getRandomFreeCell = () => {
    let rc = {row:0, col:0};
    let check = 10;
    while( check){
      const r = Math.floor( Math.random()*rows);
      const c = Math.floor( Math.random()*cols);
      if( cells[r][c] === 0){
        rc = {row:r, col:c};
        break;
      }
      check--;
    }
    if( check < 1){
      console.error( "find free cell failed");
    }
    return rc;
  };
  const populateLevel = () => {
    // weapons:club sword gun, food:apple sandwich full english breakfast,
    // monsters:goblin troll balrog, boss
    populateFoods();
    populateWeapons();
    populateMonsters();
  };
  // TODO: refactor
  const populateFoods = () => {
    const foods = [{name:"Apple", health_boost:10},
                  {name:"Sandwich", health_boost:20},
                  {name:"Full English Breakfast", health_boost:50}];
    foods.forEach( (food) => {
      const row_col = getRandomFreeCell();
      if( row_col.row && row_col.col){
        const new_food = Food(food);
        setCell( row_col.row, row_col.col, new_food);
      } else {
        console.log( "create food failed:", food);
      }
    });
  };
  const populateWeapons = () => {
    const weapons = [{ name:"Sword", damage:{min:10, max:50}},
                  { name:"Boomstick", damage:{min:30, max:80}},
                  { name:"Oozie", damage:{min:50, max:100}}];
    weapons.forEach( (weapon) => {
      const row_col = getRandomFreeCell();
      if( row_col.row && row_col.col){
        const new_weapon = Weapon( weapon);
        setCell( row_col.row, row_col.col, new_weapon);
      } else {
        console.log( "create weapon failed:", weapon);
      }
    });
  };
  const populateMonsters = () => {
    const monsters = [ Goblin(), Troll(), Balrog()];
    monsters.forEach( (monster) => {
      const row_col = getRandomFreeCell();
      if( row_col.row && row_col.col){
        setCell( row_col.row, row_col.col, monster);
      } else {
        console.log( "create monster failed:", monster);
      }
    });
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
