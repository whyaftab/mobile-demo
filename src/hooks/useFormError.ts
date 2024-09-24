import { useCallback, useEffect } from 'react';
import { UseFormSetError, FieldValues, Path, UseFormReset } from 'react-hook-form';
import { ServerResponse } from '@api/types';
import { useFocusEffect } from '@react-navigation/native';

// fill hook form with server error
export const useFormError = <
  FormType = FieldValues,
  RequestType = { [key in keyof FormType]: unknown },
>(
  serverReponse: ServerResponse<unknown, RequestType>,
  setError: UseFormSetError<FormType>,
  reset: UseFormReset<FormType>,
) => {
  // hooks
  useEffect(() => {
    if (serverReponse?.errors && Object.keys(serverReponse.errors)) {
      Object.keys(serverReponse.errors).forEach(key =>
        setError(key as Path<FormType>, {
          type: 'validate',
          message: serverReponse.errors[key][0],
        }),
      );
    }
  }, [serverReponse]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, []),
  );
};
