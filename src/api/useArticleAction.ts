// libraries
import { useMutation } from "react-query";

// misc
import { useErrorHandler } from "@hooks/useErrorHandler";
import request from "@utils/request";
import { ArticleType, MainData, ServerResponse } from "./types";

export type ArticleActionResponse = MainData;

export type ArticleActionRequest = {
  organisationId: number;
  action: "like" | "bookmark" | "view";
  feedType: ArticleType;
  feedId: number;
};

export const useArticleAction = ({
  onError,
  onSuccess,
}: {
  onSuccess?: (res: ArticleActionResponse) => void;
  onError?: (res: ServerResponse<unknown>) => void;
} = {}) => {
  // variables
  const { triggerError } = useErrorHandler();

  // request
  const query = useMutation<
    ArticleActionResponse,
    ServerResponse<unknown> | undefined,
    ArticleActionRequest
  >(
    ["VerifyCode"],
    async (params: ArticleActionRequest) => {
      try {
        const data = await request<ServerResponse<ArticleActionResponse>>({
          method: "post",
          url: `/update`,
          params,
        });

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
  return query;
};
