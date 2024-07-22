import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice"
import cartReducer from "@/redux/slices/cartSlice"


export const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
    }
})