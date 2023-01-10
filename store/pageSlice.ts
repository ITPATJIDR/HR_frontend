import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { AppState } from "./store";


export interface PageState{
	pageState: number;
}

const initialState: PageState = {
	pageState: 0
}

export const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers:{
		setPageState(state,action){
			state.pageState = action.payload;
		}
	}
})


export const { setPageState } = pageSlice.actions;

export const selectPageState = (state: AppState) => state.page.pageState;

export default pageSlice.reducer;