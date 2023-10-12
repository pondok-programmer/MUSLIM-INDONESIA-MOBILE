import {postReedProfile} from '..';

const ProfileRead = async username => {
  try {
    const response = await postReedProfile(`/api/read-profile/${username}`);
    return response;
  } catch (error) {
    console.error('Error reading profile:', error);
    throw error;
  }
};

export {ProfileRead};
