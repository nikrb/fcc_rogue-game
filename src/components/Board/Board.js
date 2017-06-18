import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component {
  render = () => {
    const table_row = {
      display: "flex",
      flexDirection: "row",
      flexGrow: "0",
      flexWrap: "nowrap"
    };
    const {cell_width, cell_height} = this.props;
    const rows = this.props.cells.map( ( row, i) => {
      return (
        <div key={i} style={table_row}>{
          row.map( (col, j) => {
            const colour = (col)?"black":"white";
            return (
              <Cell key={i*100+j}
                row={i} col={j} colour={colour}
                width={cell_width} height={cell_height} />
            );
          })
        }</div>
      );
    });
    return (
      <div>{rows}</div>
    );
  };
}
