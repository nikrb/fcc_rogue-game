// left:37 up:38 right:39 down:40
export default function(){
  let that = {};
  let interval_id = 0;
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
  const willUnmount = () => {
    window.removeEventListener( 'keyup', handleKeyup);
    window.removeEventListener( 'keydown', handleKeydown);
    if( interval_id) clearInterval( interval_id);
  };
  const tick = () => {
    window.dispatchEvent( new CustomEvent( 'game_tick'));
  };
  const start = () => {
    if( interval_id === 0){
      interval_id = setInterval( tick, 100);
    }
  };
  // TODO: do we need to remove these? memory leak?
  window.addEventListener( 'keyup', handleKeyup);
  window.addEventListener( 'keydown', handleKeydown);

  that.getKeys = getKeys;
  that.start = start;
  that.willUnmount = willUnmount;
  return that;
}
