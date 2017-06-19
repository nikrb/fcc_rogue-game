/**
 * Food

  @param {name:"name", health: { min: a, max: b}}
 */
export default function Food( init){
  const that = {},
        {name,health_boost} = init;
  const getHealthBoost = () => {
    return health_boost;
  };
  that.getColour = () => { return "green";};
  that.getName = ()=> { return name;};
  that.getHealthBoost = getHealthBoost;
  return that;
};
