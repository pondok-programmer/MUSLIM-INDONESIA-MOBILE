import {post} from '..';

const postLogin = param => {
  return post('/api/login', param);
};

export {postLogin};
