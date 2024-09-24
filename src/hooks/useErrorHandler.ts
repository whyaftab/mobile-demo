// libraries
import { showMessage } from "react-native-flash-message";

// misc
import { DETAULT_PROCESS_ERROR } from "../utils/errors";
import { ServerResponse } from "@api/types";

type ErrorHandlerType = {
  title?: string;
  error: Error | ServerResponse<unknown>;
  callback?: () => void;
};

export const useErrorHandler = () => {
  const triggerError = ({ title, error, callback }: ErrorHandlerType) => {
    let errorText = DETAULT_PROCESS_ERROR;
    if (typeof error === "string") {
      errorText = error;
    } else if (error && "message" in error) {
      errorText = error.message;
    }

    callback && callback();
    showMessage({
      message: title || errorText,
      description: title ? errorText : undefined,
      type: "danger",
    });
  };

  return { triggerError };
};
