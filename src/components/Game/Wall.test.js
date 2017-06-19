import {Wall} from './Wall';

describe( "creates wall", () => {
  it( 'creates a wall section', () => {
    const wall = Wall();
    expect( wall.getColour()).toEqual( "black");
  });
});
