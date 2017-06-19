import Game from './Game';
import {Wall} from './Wall';

describe( "game board creation", () => {
  it( 'creates board cells', () => {
    const rows = 3, cols = 4;
    const g = Game( {rows, cols});
    const b = g.getBoard();
    expect( b.length).toEqual( rows);
    b.forEach( (col) => {
      expect( col.length).toEqual( cols);
    });
  });

  it( 'creates board border', () => {
    const rows = 3, cols = 4;
    const g = Game( {rows, cols});
    g.setBorder();
    const cells = g.getBoard();
    expect( cells.length * cells[0].length).toEqual( 4*3);
    cells.forEach( (row, ndx, arr) => {
      if( ndx === 0 || ndx === arr.length-1){
        row.forEach( (cell) => {
          // FIXME: compare with Wall() object
          expect( cell.getColour()).toBe( "black");
        });
      } else {
        row.forEach( (cell, ndx, arr) => {
          if( ndx === 0 || ndx === arr.length-1){
            expect( cell.getColour()).toBe( "black");
          } else {
            expect( cell).toBe( 0);
          }
        });
      }
    });
  });
});
