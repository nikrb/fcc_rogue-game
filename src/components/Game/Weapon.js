/**
 * Weapon

  @param {name:"name", damage: { min: a, max: b}}
 */
export default function Weapon( init){
  const that = {},
        {name,damage} = init;
  const getHitDamage = () => {
    return Math.floor( Math.random()*damage.max+damage.min);
  };
  that.getColour = () => "purple";
  that.getName = ()=> name;
  that.getHitDamage = getHitDamage;
  return that;
};
