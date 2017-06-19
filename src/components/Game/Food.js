/**
 * Food

  @param {name:"name", health: { min: a, max: b}}
 */
export default function Food( init){
  const that = {},
        {name,health_boost} = init;
  const getHealthBoost = () => {
    return Math.floor( Math.random()*(health_boost.max-health_boost.min)+health_boost.min);
  };
  that.getColour = () => { return "green";};
  that.getName = ()=> { return name;};
  that.getHealthBoost = getHealthBoost;
  return that;
};
