import {postFormData} from '..';

const editProfile = async (formData, username) => {
  try {
    const response = await postFormData(
      `/api/edit-profile/${username}`,
      formData,
    );
    return response; // You might want to return the response data or handle it as needed
  } catch (error) {
    console.error('Error editing profile:', error);
    throw error; // Handle the error appropriately
  }
};

export {editProfile};
