import React from 'react';

export default class Spotlight extends React.Component {
  render = () => {
    const style = {
      position: "absolute",
      top: "0",
      left:"0",
      width: this.props.width,
      height: this.props.height
    };
    const {x,y,r} = this.props;
    const spot_path = "M0 0 v"+this.props.height+" h"+this.props.width+" v-"+
      this.props.height+" z M "+x+" "+(y-r)+
      " A "+r+" "+r+" 0 1 1 "+x+" "+(y+r)+" A "+r+" "+r+" 0 1 1 "+x+" "+(y-r)+" Z";
    return ( this.props.show_spotlight?
      <svg style={style}>
        <g fillRule="evenodd" fill="black" >
          <path d={spot_path} />
        </g>
      </svg>
      : <svg></svg>
    );
  };
}
