import {Goblin,Troll,Balrog} from './Monster';

describe( "creates monsters", () => {
  it( 'creates a goblin', () => {
    const goblin = Goblin();
    const health = goblin.getHealth();
    expect( goblin.getName()).toEqual( "Goblin");
    expect( goblin.getColour()).toEqual( 'yellow');
  });
  it( 'creates a troll', () => {
    const troll = Troll();
    expect( troll.getName()).toEqual( "Troll");
    expect( troll.getColour()).toEqual( 'orange');
  });
  it( 'create a balrog', () => {
    const balrog = Balrog();
    expect( balrog.getName()).toEqual( "Balrog");
    expect( balrog.getColour()).toEqual( "red");
  });
});

describe( "handles monster stats", () => {
  it( "handles damage", () => {
    const goblin = Goblin();
    const health = goblin.getHealth();
    expect( health).toEqual( 50);
    const dmg = goblin.getHitDamage();
    expect( dmg).toBeLessThanOrEqual( 25);
    expect( dmg).toBeGreaterThanOrEqual( 1);
    goblin.takeDamage( dmg);
    expect( goblin.getHealth()).toEqual( health-dmg);
  });
  it( "reports xp gain", () => {
    const goblin = Goblin();
    expect( goblin.getXpBoost()).toEqual( 10);
  });
});
