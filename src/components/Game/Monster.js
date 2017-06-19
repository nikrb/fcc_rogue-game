export function Monster( init){
  const that = {};
  let {name, health, damage} = init;
  const getName = () => {
    return name;
  };
  const takeDamage = ( amount) => {
    health -= amount;
    if( health < 0){
      health = 0;
    }
  };
  const getHitDamage = () => {
    return Math.floor( Math.random()*damage.max+damage.min);
  };
  that.getHealth = () => {return health;};
  that.takeDamage = takeDamage;
  that.getHitDamage = getHitDamage;
  that.getName = getName;
  that.getColour = () => { return "orange";};
  return that;
};

export function Goblin(){
  let that = Monster( { name: "Goblin",
      max_health : 100,
      health : 100,
      damage : { min:1, max:25}});
  return that;
};

export function Troll(){
  let that = Monster( {name:"Troll",
      max_health : 200,
      health : 200,
      damage : { min: 10, max:50}});
  return that;
};

export function Balrog() {
  let that = Monster( {name:"Balrog",
      max_health : 300,
      health : 300,
      damage : { min: 20, max:75}});
  return that;
};
