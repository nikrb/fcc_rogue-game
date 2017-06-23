/**
 * Weapon

  @param {name:"name", damage: { min: a, max: b}}
 */
export default ( init) => {
  const that = {},
        {name,damage} = init;
  const getHitDamage = () => {
    return Math.floor( Math.random()*(damage.max-damage.min)+damage.min);
  };
  that.getColour = () => "mediumorchid";
  that.getName = ()=> name;
  that.getHitDamage = getHitDamage;
  return that;
};
