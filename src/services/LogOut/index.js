import {postLogout} from '..';

const logout = params => {
  console.log(params, 'ini post logout');
  return postLogout('/api/logout', params);
};

export default logout;
