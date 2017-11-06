export const API_URL = 'http://localhost:3001';
export const API = {
  headers: {headers: {'Authorization': 'whatever-you-want'}},
  categories: `${API_URL}/categories`,
  category_posts: `${API_URL}/:category/posts`,
  posts: `${API_URL}/posts`,
  post_vote: `${API_URL}/posts/:id`,
  comments: `${API_URL}/comments`,
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
  POST: '/post/:post',
  NEW_POST: '/post'
};

export const LIMITATION = {
  title: 50,
  body: 500,
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