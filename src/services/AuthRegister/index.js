import {postReg} from '..';

const postRegister = params => {
  console.log(params, 'post Register');
  return postReg('/api/register', params);
};

export {postRegister};
