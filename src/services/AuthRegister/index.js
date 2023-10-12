import {postReg} from '..';

const postRegister = params => {
  return postReg('/api/register', params);
};

export {postRegister};
