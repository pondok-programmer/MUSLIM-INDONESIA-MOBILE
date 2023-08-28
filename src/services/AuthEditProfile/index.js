import {postEditProfile} from '..';

const getEditProfile = params => {
  console.log(params, 'ini params edit profile');
  return postEditProfile(`api/edit-profile/${username}`, params);
};

export {getEditProfile};
