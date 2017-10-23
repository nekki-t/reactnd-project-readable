export const API_URL = 'http://localhost:3001'
export const API = {
  headers: {headers: {'Authorization': 'whatever-you-want'}},
  categories: `${API_URL}/categories`,
  category_posts: `${API_URL}/:category/posts`,
  posts: `${API_URL}/posts`,
  comments: `${API_URL}/comments`,
  params: {
    category: ':category',
    posts: ':posts',
    id: ':id',
  },
};

export const URL = {
  ROOT: '/',
  POST: '/:post',
  NEW_POST: '/new_post'
};