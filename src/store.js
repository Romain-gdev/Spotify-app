import { configureStore } from "@reduxjs/toolkit";
import reducer from "./features/counter/counterSlice"

const store = configureStore({
    reducer: {
        favorites: reducer,
    }
});

export default store