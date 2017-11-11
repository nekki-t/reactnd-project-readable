export const API_URL = 'http://localhost:3001';
export const API = {
  headers: {headers: {'Authorization': 'whatever-you-want'}},
  categories: `${API_URL}/categories`,
  category_posts: `${API_URL}/:category/posts`,
  posts: `${API_URL}/posts`,
  post: `${API_URL}/posts/:id`,
  post_vote: `${API_URL}/posts/:id`,
  comments: `${API_URL}/posts/:id/comments`,
  comment_vote: `${API_URL}/comments/:id`,
  params: {
    category: ':category',
    posts: ':posts',
    id: ':id',
  },
  vote: {
    upVote: 'upVote',
    downVote: 'downVote',
  }
};

export const URL = {
  LOGIN: '/login',
  ROOT: '/',
  CATEGORY: '/posts/:category',
  POST: '/post/:id',
  NEW_POST: '/post',
};

export const LIMITATION = {
  title: 100,
  body: 500,
  comment: 200,
};

export const POST_ATTR = {
  id: 'id',
  timestamp: 'timestamp',
  title: 'title',
  body: 'body',
  author: 'author',
  category: 'category',
  voteScore: 'voteScore',
  deleted: 'deleted',
  commentCount: 'commentCount'
};