import {postLogout} from '..';

const logout = params => {
  return postLogout('/api/logout', params);
};

export default logout;
