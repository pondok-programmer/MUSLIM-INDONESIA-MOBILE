import {post} from '..';

const postLogin = param => {
  console.log(param, 'post Login');
  return post('/api/login', param);
};

export {postLogin};
