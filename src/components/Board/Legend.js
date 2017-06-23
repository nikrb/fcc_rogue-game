import React from 'react';
import Cell from './Cell';

export default () => {
  const legend={
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const padLarge={
    margin: "5px"
  }
  const padSmall={
    padding: "2px"
  }
  return (
    <div style={legend}>
      <span style={padLarge}>Monsters:</span>
        <span style={padSmall}>
          <Cell width={8} height={8} colour="yellow" />
        </span>
        <span style={padSmall}>
          <Cell width={8} height={8} colour="orange" />
        </span>
        <span style={padSmall}>
          <Cell width={8} height={8} colour="red" />
        </span>
      <span style={padLarge}>Food:</span>
        <Cell width={8} height={8} colour="limegreen" />
      <span style={padLarge}>Weapons:</span>
        <Cell width={8} height={8} colour="mediumorchid" />
    </div>
  );
};
