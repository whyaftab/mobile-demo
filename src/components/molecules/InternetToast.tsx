// libraries
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect } from "react";
import { showMessage } from "react-native-flash-message";

// misc
import { CustomIcon } from "@components/atoms";

// types
export type InternetToastProps = {};

export const InternetToast: React.FC<InternetToastProps> = () => {
  // variables
  const { isConnected } = useNetInfo();

  //   hooks
  useEffect(() => {
    if (!isConnected && isConnected !== null) {
      showMessage({
        icon: () => <CustomIcon color="white" name="warning" type="ionic" />,
        message: "No internet connection, Some features may not work properly!",
        position: "top",
        duration: 8000,
        type: "warning",
      });
    }
  }, [isConnected]);

  // functions

  // renders
  return null;
};
