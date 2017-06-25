import level from './level.json';

export function loadLevel(){
  // dirty fix for github.io demo
  return level;
  // return fetch( '/level.json')
  // .then( checkStatus)
  // .then( parseJSON);
};

/* github.io workaround doesn't need these
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}
*/
