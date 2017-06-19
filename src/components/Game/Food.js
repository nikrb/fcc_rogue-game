/**
 * Food

  @param {name:"name", health: { min: a, max: b}}
 */
export default function Food( init){
  const that = {},
        {name,health} = init;
  const getHealthBoost = () => {
    return Math.floor( Math.random()*health.max+health.min);
  };
  that.getColour = () => "green";
  that.getName = ()=> name;
  that.getHealthBoost = getHealthBoost;
  return that;
};
