export const Monster = ( init) => {
  const that = {};
  let {name, health, damage, xp_boost, colour} = init;
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
    return Math.floor( Math.random()*(damage.max-damage.min)+damage.min);
  };
  that.getHealth = () => {return health;};
  that.takeDamage = takeDamage;
  that.getHitDamage = getHitDamage;
  that.getName = getName;
  that.getColour = () => { return colour;};
  that.getXpBoost = ()=>xp_boost;
  return that;
};

export const Goblin = () =>{
  let that = Monster( { name: "Goblin",
      max_health : 50,
      health : 50,
      xp_boost: 10,
      damage : { min:1, max:10},
      colour: "yellow"
    });
  return that;
};

export const Troll = ()=>{
  let that = Monster( {name:"Troll",
      max_health : 100,
      health : 100,
      xp_boost: 20,
      damage : { min: 10, max:30},
      colour: "orange"
    });
  return that;
};

export const Balrog = ()=> {
  let that = Monster( {name:"Balrog",
      max_health : 200,
      health : 200,
      xp_boost: 40,
      damage : { min: 20, max:50},
      colour : "red"
    });
  return that;
};
