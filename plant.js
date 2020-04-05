// This function stores our state.

const storeState = () => {
  let oldState = {};
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(oldState);
    oldState = { ...newState };
    return newState;
  }
}

// const stateChanger = storeState();
const firstPlant = storeState();
const secondPlant = storeState();

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    })
  }
}

// We create two functions using our function factory. We could easily create many more.

const feed = changeState("soil");
const blueFood = changeState("soil")(5);

const water = changeState("water");
const softWater = changeState("water")(1);

const light = changeState("light");
const sunlight = changeState("light")(1);

$(document).ready(function () {

  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect.
  //first plant 
  $('#feed').click(function () {
    const rose = firstPlant(blueFood);
    $('#soil-value').text(rose.soil);
  });

  $('#water').click(function () {
    const newState = firstPlant(softWater);
    $('#water-value').text(newState.water);
  });

  $('#light').click(function () {
    const newState = firstPlant(sunlight);
    $('#light-value').text(newState.light);
  });

  //second plant
  $('#feed2').click(function () {
    const sunflower = secondPlant(blueFood);
    $('#soil-value2').text(sunflower.soil);
  });

  $('#water2').click(function () {
    const newState = secondPlant(softWater);
    $('#water-value2').text(newState.water);
  });

  $('#light2').click(function () {
    const newState = secondPlant(sunlight);
    $('#light-value2').text(newState.light);
  });
});

