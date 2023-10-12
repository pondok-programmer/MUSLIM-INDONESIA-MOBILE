import {postReadContentMasjid} from '..';

const MasjidPost = () => {
  return postReadContentMasjid('/api/read-place');
};
export {MasjidPost};
