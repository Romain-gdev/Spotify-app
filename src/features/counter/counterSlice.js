import { createSlice } from '@reduxjs/toolkit'

export const favorites = createSlice({
  name: 'favorites',
  initialState: {
    value: [],
  },
  reducers: {
    addFavorite: (state, id) => {
      state.value.push(id.payload)
      return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const { isFavorite, addFavorite } = favorites.actions

export default favorites.reducer