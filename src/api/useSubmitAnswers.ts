// libraries
import { useMutation } from "react-query";

// misc
import { useErrorHandler } from "@hooks/useErrorHandler";
import request from "@utils/request";
import { ServerResponse } from "./types";

export type SubmitAnswerResponse = ServerResponse<unknown>;

type Answer = string;

export type SubmitAnswerRequest = {
  organisationId: number;
  siteId: number;
  questionnaireId: number;
  userId?: null | number;
  answers: { [question: string]: Answer };
};

export const useSubmitAnswers = ({
  onError,
  onSuccess,
}: {
  onSuccess?: (res: SubmitAnswerResponse) => void;
  onError?: (res: ServerResponse<unknown>) => void;
} = {}) => {
  // variables
  const { triggerError } = useErrorHandler();

  // request
  const query = useMutation<
    SubmitAnswerResponse,
    ServerResponse<unknown> | undefined,
    SubmitAnswerRequest
  >(
    ["answers"],
    async (params: SubmitAnswerRequest) => {
      try {
        const data = await request<ServerResponse<SubmitAnswerResponse>>({
          method: "post",
          url: `/questionnaire/responses/create`,
          params,
        });

        return data;
      } catch (error) {
        triggerError({ error });
      }
    },
    {
      onError: (error) => {
        triggerError({ error });
        onError && onError(error);
      },
      onSuccess: (res) => {
        if (res) {
          onSuccess(res);
        }
      },
    }
  );

  // return
  return query;
};
