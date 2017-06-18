// left:37 up:38 right:39 down:40
export default function(){
  let that = {};
  let ikeys = { left: false, up: false, right: false, down: false};
  const handleKeyup = (e) => {
    switch( e.keyCode){
      case 37: ikeys.left = false; break;
      case 38: ikeys.up   = false; break;
      case 39: ikeys.right= false; break;
      case 40: ikeys.down = false; break;
      default: break;
    }
  };
  const handleKeydown = (e) => {
    switch( e.keyCode){
      case 37: ikeys.left = true; break;
      case 38: ikeys.up   = true; break;
      case 39: ikeys.right= true; break;
      case 40: ikeys.down = true; break;
      default: break;
    }
  };
  const getKeys = () => {
    return ikeys;
  };
  // TODO: do we need to remove these? memory leak?
  window.addEventListener( 'keyup', handleKeyup);
  window.addEventListener( 'keydown', handleKeydown);

  that.getKeys = getKeys;
  return that;
}
