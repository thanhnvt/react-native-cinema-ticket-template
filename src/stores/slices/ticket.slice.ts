import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CinemaPaymentRequestType } from "../../types/CinemaTypes";

export interface TicketStates {
  tickets: Array<CinemaPaymentRequestType>;
}

const defaultState: TicketStates = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState: defaultState,
  reducers: {
    setTickets: (
      state: TicketStates,
      action: PayloadAction<any>
    ): TicketStates => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addTicketSuccess: (
      state: TicketStates,
      action: PayloadAction<any>
    ): TicketStates => {
      const { ticket } = action.payload;
      state = {
        ...state,
        tickets: [...state.tickets, ticket],
      };
      return state;
    },
  },
});

export const { addTicketSuccess, setTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
