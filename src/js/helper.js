// Store all the helper functions that can be used in all the scripts

import { TIMEOUT_SEC } from './config.js';

// After number of sec, returns rejected promise
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    // const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // Pass the error to higher level function; loadRecipe
    // Otherwise function returns nothing
    throw err;
  }
};
