import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttps } from "../../hook/useHttps";

const initialState = {
    filters:[],
    filterLoadingStatus:"sam",
    activeFilter:"all"
}

export const fetchFilterNews = createAsyncThunk(
    "news/fetchFilterNews",
    async() => {
        const {request} = useHttps()
        return await request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name:"filters",
    initialState,
    reducers:{
        activeFilterChanged : (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilterNews.pending,  state => {state.filterLoadingStatus = "loading"})
            .addCase(fetchFilterNews.fulfilled, (state, action) => {
                state.filterLoadingStatus = "sam";
                state.filters = action.payload
            })
            .addCase(fetchFilterNews.rejected, state => {state.filterLoadingStatus = "error"})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} = actions;