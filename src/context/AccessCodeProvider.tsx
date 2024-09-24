/* eslint-disable @typescript-eslint/no-empty-function */
// libraries
import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// misc
import { APP_ACCESS_CODE } from "@utils/keys";
import { useAccess } from "@api/useAccess";
import { useAppDispatch } from "@redux/store";
import { setData } from "@screens/appSlice";
import { retrieveAccessData } from "@utils/helpers";

// types
interface DefaultValue {
  accessCode?: string;
  setAccessCode: (accessCode: string) => Promise<boolean>;
  resetAccessCode: () => void;
  getAccessCode: () => Promise<string>;
  isUnauthorized: boolean;
  initLoading: boolean;
}

const defaultValue: DefaultValue = {
  setAccessCode: () => Promise.resolve(true),
  resetAccessCode: () => {},
  getAccessCode: () => Promise.resolve(""),
  isUnauthorized: false,
  initLoading: false,
};

// context
const AccessCodeContext = createContext(defaultValue);

export const AccessCodeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // accessCode variable
  const [currentAccessCode, setCurrentAccessCode] = useState<string>();
  const [initLoading, setInitLoading] = useState(true);
  const { mutate, isLoading: isAccessDataLoading } = useAccess();
  const [ignoreApiLoading, setIgnoreApiLoading] = useState(false);
  const dispatch = useAppDispatch();

  // functions
  const getAccessCode: DefaultValue["getAccessCode"] = async () => {
    try {
      const code = await AsyncStorage.getItem(APP_ACCESS_CODE);
      setInitLoading(false);

      if (code) {
        const data = await retrieveAccessData();
        if (data) {
          setIgnoreApiLoading(true);
          dispatch(setData(data));
        }
        mutate({ access_code: code, call_type: data ? "refresh" : "new" });
      }

      setCurrentAccessCode(code);
      return code;
    } catch (error) {
      console.log(error);
    }
  };

  const setAccessCode: DefaultValue["setAccessCode"] = async (code) => {
    await AsyncStorage.setItem(APP_ACCESS_CODE, code);
    setCurrentAccessCode(code);
    return Promise.resolve(true);
  };

  const resetAccessCode = async () => {
    await AsyncStorage.removeItem(APP_ACCESS_CODE);
    setCurrentAccessCode(undefined);
  };

  // accessCode provider
  return (
    <AccessCodeContext.Provider
      value={{
        accessCode: currentAccessCode,
        setAccessCode,
        resetAccessCode,
        getAccessCode,
        isUnauthorized: !currentAccessCode,
        initLoading: initLoading || (isAccessDataLoading && !ignoreApiLoading),
      }}
    >
      {children}
    </AccessCodeContext.Provider>
  );
};

export const useAccessCode = () => useContext(AccessCodeContext);
