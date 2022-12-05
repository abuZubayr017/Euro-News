// import { newsFetching, newsFetched, newsFetchingError} from "../components/NewsList/news_slice";
// import {filtersFetching, filtersFetched, filtersFetchingError} from "../components/NewsFilter/filters_slice";

// export const fetchNews = (request) => (dispatch) => {
//     dispatch(newsFetching())
//     request("http://localhost:3001/news")
//       .then(data => dispatch(newsFetched(data)))
//       .catch(() => dispatch(newsFetchingError()))
// }

// export const fetchFilterNews = (request) => (dispatch) => {
//     dispatch(filtersFetching())
//     request("http://localhost:3001/filters")
//       .then(data =>  dispatch(filtersFetched(data)))
//       .catch(err => dispatch(filtersFetchingError(err)))
// }



// import { createAction } from "@reduxjs/toolkit";
// export const newsFetching = createAction("NEWS_FETCHING")
// export const newsFetched = createAction("NEWS_FETCHED")
// export const newsFetchingError = createAction("NEWS_FETCHING_ERROR")
// export const newsCreated = createAction("NEWS_CREATED")
// export const newsDeleted = createAction("NEWS_DELETED")
// export const filtersFetching = createAction("FILTERS_FETCHING")
// export const filtersFetched = createAction("FILTERS_FETCHED")
// export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR")
// export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED")
