import Weapon from './Weapon';

export default ( init) => {
  const that = {};
  let { row, col} = init;
  const start_row = row;
  const start_col = col;
  const xp_levels = [ 0, 20, 40, 60, 80, 100];
  let health = 100,
      level = 1,
      xp = 0;
  let weapon = Weapon( { name: "Club", damage: { min: 5, max:10}});
  const reset =  () => {
    health = 100;
    level = 1;
    xp = 0;
    weapon = Weapon( { name: "Club", damage: { min: 5, max:10}});
    row = start_row;
    col = start_col;
  };
  const getCoords = () => {
    return { row: row, col: col};
  };
  const setCoords = ( player_row, player_col) => {
    row = player_row;
    col = player_col;
  };
  const getHitDamage = () => {
    return weapon.getHitDamage() * level;
  };
  const addHealth = ( delta_health) => {
    health += delta_health;
    if( health < 1) health = 0;
  };
  const addXp = (new_xp) => {
    xp += new_xp;
    if( xp >= xp_levels[level]) level += 1;
  };
  const setWeapon = ( wpn)=>{
    weapon = wpn;
  };
  that.getColour = () => "black";
  that.getName = ()=> "Player";
  that.getCoords = getCoords;
  that.setCoords = setCoords;
  that.getHealth = ()=> health;
  that.addHealth = addHealth;
  that.getHitDamage = getHitDamage;
  that.addXp = addXp;
  that.getLevel = () => level;
  that.getXp = () => xp;
  that.getWeapon = () => weapon;
  that.setWeapon = setWeapon;
  that.reset = reset;
  return that;
};
