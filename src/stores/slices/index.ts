import { combineReducers } from "@reduxjs/toolkit";
import movieReducers from "./movies.slice";
import ticketReducers from "./ticket.slice";

const rootReducer = combineReducers({
  movies: movieReducers,
  ticket: ticketReducers,
});

export default rootReducer;
