/**
 * Food

  @param {name:"name", health: { min: a, max: b}}
 */
export default ( init) => {
  const that = {},
        {name,health_boost} = init;
  const getHealthBoost = () => {
    return health_boost;
  };
  that.getColour = () => { return "limegreen";};
  that.getName = ()=> { return name;};
  that.getHealthBoost = getHealthBoost;
  return that;
};
