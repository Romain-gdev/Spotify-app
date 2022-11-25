import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

const store = configureStore({
    reducer: {
        counter: rootReducer,
    }
});

export default store