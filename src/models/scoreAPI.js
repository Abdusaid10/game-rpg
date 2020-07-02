import 'regenerator-runtime';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const id = '5uXf60H5JF4rfAIdWb23';

const initData = async () => {
  const title = JSON.stringify({
    name: 'Dragon fighter',
  });

  const headers = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: title,
  };
  try {
    const response = await fetch(proxyurl + baseUrl, headers, { mode: 'no-cors' });
    const data = await response.json();
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

const sort = (data) => {
  const arr = [];

  for (let i = 0; i < data.length; i += 1) {
    arr.push([data[i].user, data[i].score]);
  }
  arr.sort((a, b) => b[1] - a[1]);

  return arr;
};

const getData = async () => {
  const headers = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application-json',
    },
  };

  const response = await fetch(`${proxyurl}${baseUrl}/${id}/scores/`, headers);
  const data = await response.json();

  return sort(data.result);
};

export {
  initData,
  postData,
  getData,
};