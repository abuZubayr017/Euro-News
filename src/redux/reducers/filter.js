import { createReducer } from "@reduxjs/toolkit"
import {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} from "../actions"

const initialState = {
    filters:[],
    filterLoadingStatus:"sam",
    activeFilter:"all"
}

const filter = createReducer(initialState, {
    [filtersFetching] : state => {state.filterLoadingStatus = "loading"},
    [filtersFetched] : (state, action) => {
        state.filterLoadingStatus = "sam";
        state.filters = action.payload
    },
    [filtersFetchingError] : state => {state.filterLoadingStatus = "error"},
    [activeFilterChanged] : (state, action) => {state.activeFilter = action.payload}
}, [], state => state)


export default filter;