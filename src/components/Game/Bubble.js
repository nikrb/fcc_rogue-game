import React from 'react';

export default class Bubble extends React.Component {
  state = {
    move_it : false
  }
  componentDidMount = () => {
    window.setTimeout( this.move_it, 100);
  };
  move_it = () => {
    this.setState( { move_it : true});
  };
  finish = () => {
    this.props.onFinished();
  };
  render = () => {
    const box = {
      textAlign: "center",
      position: "absolute",
      backgroundColor: "#f44",
      borderRadius: "100%",
      width:"30px",
      opacity: 1,
      top: this.props.top+"px",
      left: this.props.left+"px",
      zIndex: "500",
      transition: "2.0s"
    }
    let style={...box};
    if( this.state.move_it){
      style.top = (this.props.top-150)+"px";
      style.opacity = 0;
    }
    return (
      <div style={style} onTransitionEnd={this.finish} >
        {this.props.text}
      </div>
    );
  };
}
