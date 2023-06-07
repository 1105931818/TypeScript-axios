# TypeScript-axios
import request from 'request.ts';

const url = '/user/login';

const data = { username: 'admin', password: '111111' };

request.post(url, data).then((res) => {
  console.log(res);
  return res;
});
