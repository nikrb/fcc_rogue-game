import Food from './Food';

describe( "creates Foods", () => {
  it( 'creates any Food', () => {
    const food = Food( {name: "Apple", health_boost: {min:25, max:80}});
    expect( food.getColour()).toBe( "green");
    expect( food.getName()).toBe( "Apple");
    expect( food.getHealthBoost()).toBeLessThanOrEqual( 80);
    expect( food.getHealthBoost()).toBeGreaterThanOrEqual(25);
  });
});
