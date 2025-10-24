import { useState } from "react";
import { Alert } from "react-native";
import { CONFIRMATION_MESSAGES, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { showErrorToast, showSuccessToast } from "../utils/errorHandler";

interface UseConfirmLogoutProps {
  onLogout: () => Promise<void>;
}

export const useConfirmLogout = ({ onLogout }: UseConfirmLogoutProps) => {
  const [loading, setLoading] = useState(false);

  const confirmLogout = () => {
    Alert.alert(CONFIRMATION_MESSAGES.LOGOUT_TITLE, CONFIRMATION_MESSAGES.LOGOUT_MESSAGE, [
      {
        text: CONFIRMATION_MESSAGES.CANCEL,
        style: "cancel",
      },
      {
        text: CONFIRMATION_MESSAGES.CONFIRM_LOGOUT,
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            await onLogout();
            showSuccessToast(SUCCESS_MESSAGES.LOGOUT_SUCCESS, SUCCESS_MESSAGES.LOGOUT_TITLE);
          } catch {
            showErrorToast(ERROR_MESSAGES.GENERIC_ERROR, "Erro ao Sair");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return { confirmLogout, loading };
};
