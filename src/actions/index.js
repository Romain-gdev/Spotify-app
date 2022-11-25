import { ADD_BOOKMARK, DELETE_BOOKMARK } from "./types";

export const addBookmark = ({ title, url }) => ({
  type: ADD_BOOKMARK,
  payload: {
    id: 4,
    title,
    url
  }
});

export const deleteBookmark = (id) => ({
  type: DELETE_BOOKMARK,
  payload: {
    id
  }
});
