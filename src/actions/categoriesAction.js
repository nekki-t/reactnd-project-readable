import { START_LOAD_CATEGORIES, CATEGORIES_LOADED } from './actionTypes';
import readableApi from '../api/readableApi';

export const startCategoriesLoading = () => ({
  type: START_LOAD_CATEGORIES,
  loading: true,
  categories: [],
});

export const categoriesLoaded = (results) => ({
  type: CATEGORIES_LOADED,
  loading: false,
  categories: results,
});

export function loadCategories () {
  return dispatch => {
    dispatch(startCategoriesLoading());
    return readableApi.fetchCategories()
      .then(
        response => {
          dispatch(categoriesLoaded(response.data.categories));
        }
      )
      .catch(error => {
        throw(error)
      });
  };
}

