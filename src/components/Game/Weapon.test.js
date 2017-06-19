import Weapon from './Weapon';

describe( "creates weapons", () => {
  it( 'creates any weapon', () => {
    const sword = Weapon( {name: "Sword", damage: {min:25, max:80}});
    expect( sword.getColour()).toBe( "purple");
    expect( sword.getName()).toBe( "Sword");
    expect( sword.getHitDamage()).toBeLessThanOrEqual( 80);
    expect( sword.getHitDamage()).toBeGreaterThanOrEqual(25);
  });
});
