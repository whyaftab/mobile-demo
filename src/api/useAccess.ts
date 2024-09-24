// libraries
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

// misc
import { useErrorHandler } from "@hooks/useErrorHandler";
import request from "@utils/request";
import { MainData, ServerResponse } from "./types";
import { useAccessCode } from "@context/AccessCodeProvider";
import { useAppDispatch } from "@redux/store";
import { setData } from "@screens/appSlice";
import { ACCESS_FILE_NAME } from "@utils/constants";

export type AccessResponse = MainData;

export type AccessRequest = {
  access_code: string;
  call_type: "new" | "refresh";
};

const TOTAL_SIZE_ESTIMATE = 3242069;

export const useAccess = ({
  onError,
  onSuccess,
}: {
  onSuccess?: (res: AccessResponse) => void;
  onError?: (res: ServerResponse<unknown>) => void;
} = {}) => {
  // variables
  const { triggerError } = useErrorHandler();
  const { setAccessCode } = useAccessCode();
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);

  // request
  const query = useMutation<
    AccessResponse,
    ServerResponse<unknown> | undefined,
    AccessRequest
  >(
    ["VerifyCode"],
    async ({ access_code, call_type }: AccessRequest) => {
      try {
        const timeStamp = await AsyncStorage.getItem(ACCESS_FILE_NAME);
        const data = await request<ServerResponse<AccessResponse>>({
          method: "post",
          url: `/access`,
          params: {
            access_code,
            call_type,
            check_timestamp: timeStamp || "",
          },
          onDownloadProgress: (progressEvent) => {
            setProgress(
              progressEvent.loaded / (progressEvent.total | TOTAL_SIZE_ESTIMATE)
            );
          },
        });

        if (data.success) {
          if (data.data) {
            await AsyncStorage.setItem(
              ACCESS_FILE_NAME,
              data.data.apiTimestamp.toString()
            );
            dispatch(setData(data));
          }
          setTimeout(() => {
            setAccessCode(access_code);
          }, 200);
        }

        return data.data;
      } catch (error) {
        triggerError({ error });
      }
    },
    {
      onError: (error) => {
        triggerError({ error });
        onError && onError(error);
      },
      onSuccess: onSuccess,
    }
  );

  // return
  return { ...query, progress };
};
