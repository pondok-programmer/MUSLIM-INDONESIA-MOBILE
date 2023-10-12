import {postSearch} from '..';

const APISearch = params => {
  return postSearch('/api/search', params);
};

export {APISearch};
