import React from 'react';

export default (props) => {
  const overlay = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    zIndex: '99',
    backgroundColor: 'rgba(0,0,0,0.9)',
  };
  const dlg={
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "stretch",
    // alignItems: "center",
    textAlign: "center",
    width: "400px",
    height: "200px",
    margin: "5em auto",
    padding: "10px",
    backgroundColor: "rgba( 255,255,255,0.95)"
  };
  return (
    <div style={overlay}>
      <div style={dlg}>
        <h2>{props.message}</h2>
        <p>Play Again?</p>
        <div>
          <button onClick={props.onYes} >Yes</button>
          <button onClick={props.onNo} >No</button>
        </div>
      </div>
    </div>
  );
};
