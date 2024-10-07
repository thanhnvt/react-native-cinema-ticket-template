import { useDispatch } from "react-redux";
import api from "../services";
import { CinemaPaymentRequestType } from "../types/CinemaTypes";
import { handleErrorMessenger } from "../utils/apiUtils";
import { addTicketSuccess } from "../stores/slices/ticket.slice";
import { Alert } from "react-native";
import { resetScreen } from "../utils/navigationUtils";
import ScreenKey from "../constants/ScreenKey";

export const usePayment = () => {
  const dispath = useDispatch();
  const onPayment = async (params: CinemaPaymentRequestType) => {
    try {
      const result = await api.cinema.onPayment(params);
      if (result?.status === 200) {
        Alert.alert("Payment", "Payment success");
        dispath(addTicketSuccess({ ticket: params }));
        resetScreen(ScreenKey.MAIN_TAB);
        return;
      }
      handleErrorMessenger(result);
    } catch (error) {
      handleErrorMessenger(error);
    }
  };
  return {
    onPayment,
  };
};
