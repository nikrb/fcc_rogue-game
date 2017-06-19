import Weapon from './Weapon';

export default function Player( init){
  const that = {};
  let { row, col} = init;
  const xp_levels = [ 0, 20, 40, 60, 80, 100];
  let health = 100,
      level = 1,
      xp = 0;
  let weapon = Weapon( { name: "Club", damage: { min: 20, max:50}});
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
  return that;
};
