import {postReadContentMasjid} from '..';

const MasjidPost = () => {
  console.log('Auth masjid');
  return postReadContentMasjid('/api/read-place');
};
export {MasjidPost};
