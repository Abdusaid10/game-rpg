import 'regenerator-runtime';

// const fetch = require('node-fetch');
const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const id = '5uXf60H5JF4rfAIdWb23';

const initData = async () => {
  const title = JSON.stringify({
    name: 'Dragon fighter',
  });
  let data = {};
  const setData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: title,
  };
  try {
    const response = await fetch(proxyurl + baseUrl, setData, { mode: 'no-cors' });
    data = await response.json();
    console.log(data.result);
    return data.result;
  } catch (err) {
    return err;
  }
};

const postData = async (name, score) => {
  const post = JSON.stringify({
    user: name,
    score,
  });

  const headers = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };

  const response = await fetch(`${proxyurl}${baseUrl}/${id}/scores/`, headers);
  const result = await response.json();
  return result.result;
};

const getData = async () => {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application-json',
    },
  };
  const response = await fetch(`${proxyurl}${baseUrl}/${id}/scores/`, data);
  const result = await response.json();

  return result.result;
};

export { initData as default };