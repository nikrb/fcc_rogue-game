import {Monster,Goblin,Troll} from './Monster';

describe( "creates monsters", () => {
  it( 'creates a goblin', () => {
    const goblin = Goblin();
    const health = goblin.getHealth();
    expect( goblin.getName()).toEqual( "Goblin");
    expect( goblin.getColour()).toEqual( 'yellow');
    expect( goblin.getHealth()).toEqual( 100);
    const dmg = goblin.getHitDamage();
    expect( dmg).toBeLessThanOrEqual( 25);
    expect( dmg).toBeGreaterThanOrEqual( 1);
    goblin.takeDamage( dmg);
    expect( goblin.getHealth()).toEqual( health-dmg);
    expect( goblin.getXpBoost()).toEqual( 10);
  });
  it( 'creates a troll', () => {
    const troll = Troll();
    expect( troll.getName()).toEqual( "Troll");
    expect( troll.getColour()).toEqual( 'orange');
  });
});
