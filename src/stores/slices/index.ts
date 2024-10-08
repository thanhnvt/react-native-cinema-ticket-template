import { combineReducers } from "@reduxjs/toolkit";
import movieReducers from "./movies.slice";
import ticketReducers from "./ticket.slice";
import authReducers from "./auth.slice";

const rootReducer = combineReducers({
  movies: movieReducers,
  ticket: ticketReducers,
  auth: authReducers,
});

export default rootReducer;
