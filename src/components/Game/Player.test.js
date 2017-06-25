import Player from './Player';

describe( "creates Player", () => {
  it( 'creates Player', () => {
    const player = Player( { row:0, col:0});
    expect( player.getColour()).toBe( "black");
    expect( player.getName()).toBe( "Player");
    expect( player.getHitDamage()).toBeLessThanOrEqual( 10);
    expect( player.getHitDamage()).toBeGreaterThanOrEqual(5);
    const health = player.getHealth();
    const dam = player.getHitDamage();
    player.addHealth( 10);
    expect( player.getHealth()).toEqual( health + 10);
    player.addHealth( -20);
    expect( player.getHealth()).toEqual( health + 10 - 20);
    player.addXp( 20);
    expect( player.getXp()).toEqual( 20);
    expect( player.getLevel()).toEqual( 2);
  });
});
