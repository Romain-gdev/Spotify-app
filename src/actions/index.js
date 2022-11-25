import { ADD_SONG, DELETE_SONG } from "./types";

export const addSong = ({idSong}) => ({
    type: ADD_SONG,
    payload: {
        id: idSong,

    }
})

export const deleteBookmark = (idSong) => ({
    type: DELETE_SONG,
    payload: {
      idSong
    }
  });
  