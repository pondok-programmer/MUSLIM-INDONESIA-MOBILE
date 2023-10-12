import React, {useContext, useState} from 'react';

export const UserUpdate = () => {
  const [user, setUser] = useState({
    full_name: '',
    photo: '',
  });

  const updateUser = newUserData => {
    setUser(prevUser => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return {
    user,
    updateUser,
  };
};
