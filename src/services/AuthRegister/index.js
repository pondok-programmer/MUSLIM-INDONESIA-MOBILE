import {postReg} from '..';

const Register = params => {
  console.log(params, 'post Register');
  return postReg('/api/register', params);
};

export {Register};
