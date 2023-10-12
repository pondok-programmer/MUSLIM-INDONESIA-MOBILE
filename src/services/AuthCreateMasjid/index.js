import {postCreateAdmin} from '..';

const postAdminCreate = async formData => {
  try {
    const response = await postCreateAdmin('/api/create-place', formData);
    console.log('ini post create admin', response);
    return response;
  } catch (err) {
    console.log('Error create Masjid', err);
    throw err;
  }
};

export {postAdminCreate};
