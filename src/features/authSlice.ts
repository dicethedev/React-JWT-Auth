import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store"

export interface AuthSate {
     name: string | null;
     token: string | null;
}

const initialState: AuthSate = {
     name: null,
     token: null,
}

export const  authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          setUser: (state, action: PayloadAction<{name: string, token: string}>) => {
               // pass a key pf "user"
               localStorage.setItem("user", JSON.stringify({
                    name: action.payload.name,
                    token: action.payload.token
               }));

               state.name =  action.payload.name;
               state.token = action.payload.token;
          },
          //=============== Logout Action ===============
          logout: (state) => {
               localStorage.clear();
               state.name =  null;
               state.token = null;
          }
     }
})

export const selectAuth  = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

//I heada back to store.tsx that is found in the folder app