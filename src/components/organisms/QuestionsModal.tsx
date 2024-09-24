// libraries
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { useForm } from "react-hook-form";
import { showMessage } from "react-native-flash-message";

// component
import {
  CustomModal,
  CustomModalProps,
  RadioInput,
  RadioInputDataType,
} from "@components/molecules";
import { BigButton, DivColumn, SpacerColumn } from "@components/atoms";

// misc
import { Linkable } from "@api/types";
import { SubmitAnswerRequest, useSubmitAnswers } from "@api/useSubmitAnswers";
import { useAppSelector } from "@redux/store";
import {
  selectOrganizationId,
  selectSiteId,
  selectUserId,
} from "@screens/appSelectors";

// types
export interface QuestionsModalProps
  extends Pick<CustomModalProps, "isVisible" | "onClose"> {
  data: Linkable;
  questionnaireId: number;
}

export const QuestionsModal: React.FC<QuestionsModalProps> = ({
  data,
  questionnaireId,
  ...restProps
}) => {
  // variables
  const orgId = useAppSelector(selectOrganizationId);
  const siteId = useAppSelector(selectSiteId);
  const userId = useAppSelector(selectUserId);
  const { handleSubmit, control, setValue, reset } = useForm<
    SubmitAnswerRequest["answers"]
  >({});
  const { layout } = useTheme();
  const { mutate, isLoading } = useSubmitAnswers({
    onSuccess: (res) => {
      reset();
      restProps.onClose();
      showMessage({
        message: "Thank you for answering the questions!",
        type: "success",
      });
    },
  });

  // functions
  const generateRadioValues: (value: string) => RadioInputDataType<string> = (
    value
  ) =>
    value.split(", ").map((v) => ({
      label: v,
      value: v,
    }));

  const onPressSubmit = (data: SubmitAnswerRequest["answers"]) => {
    mutate({
      organisationId: orgId,
      siteId,
      questionnaireId,
      userId,
      answers: data,
    });
  };

  // renders
  return (
    <CustomModal
      {...restProps}
      containerColor="transparent"
      containerStyle={{ paddingHorizontal: layout.padding_x2 }}
      headerContainerStyle={{ right: layout.padding_x3 }}
    >
      <DivColumn>
        <Container>
          <SpacerColumn size={3} />
          {data.question_one && (
            <RadioInput
              name={data.question_one}
              control={control}
              data={generateRadioValues(data?.answers_one || "")}
              onChangeValue={setValue}
              title={data.question_one}
              rules={{ required: true }}
            />
          )}
          {data.question_two && (
            <RadioInput
              name={data.question_two}
              control={control}
              data={generateRadioValues(data?.answers_two || "")}
              onChangeValue={setValue}
              title={data.question_two}
              rules={{ required: true }}
            />
          )}

          {data.question_three && (
            <RadioInput
              name={data.question_three}
              control={control}
              data={generateRadioValues(data?.answers_three || "")}
              onChangeValue={setValue}
              title={data.question_three}
              rules={{ required: true }}
            />
          )}

          {data.question_four && (
            <RadioInput
              name={data.question_four}
              control={control}
              data={generateRadioValues(data?.answers_four || "")}
              onChangeValue={setValue}
              title={data.question_four}
              rules={{ required: true }}
            />
          )}

          {data.question_five && (
            <RadioInput
              name={data.question_five}
              control={control}
              data={generateRadioValues(data?.answers_five || "")}
              onChangeValue={setValue}
              title={data.question_five}
              rules={{ required: true }}
            />
          )}

          <BigButton
            text="SUBMIT"
            onPress={handleSubmit(onPressSubmit)}
            isLoading={isLoading}
          />
          <SpacerColumn size={3} />
        </Container>
      </DivColumn>
    </CustomModal>
  );
};

const Container = styled.ScrollView(({ theme: { colors, layout } }) => ({
  backgroundColor: colors.secondary,
  borderRadius: 16,
  paddingHorizontal: layout.padding_x3,
}));
