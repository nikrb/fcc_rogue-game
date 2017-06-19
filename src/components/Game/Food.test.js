import Food from './Food';

describe( "creates Foods", () => {
  it( 'creates any Food', () => {
    const food = Food( {name: "Apple", health_boost: 20});
    expect( food.getColour()).toBe( "green");
    expect( food.getName()).toBe( "Apple");
    expect( food.getHealthBoost()).toEqual( 20);
  });
});
