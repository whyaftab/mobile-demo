// libraries
import React from "react";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";

// components
import { BigButton, CustomText, Input, SpacerColumn } from "@components/atoms";

// misc
import { LoginFormType } from "./types";
import { genericStyles } from "@styles/genericStyles";
import { useAccess } from "@api/useAccess";

export const SignInScreen = () => {
  // variables
  const { control, handleSubmit } = useForm<LoginFormType>({
    mode: "all",
  });

  const { mutate, isLoading, progress } = useAccess({
    onSuccess: () => {
      // navigate("auth", { screen: "authorise" });
    },
  });

  // functions
  const onPressSubmit = ({ inviteCode }: LoginFormType) => {
    mutate({ access_code: inviteCode, call_type: "new" });
  };

  // returns
  return (
    <Container contentContainerStyle={genericStyles.fill}>
      <CustomText font="bodyBold" size={34}>
        Welcome to the Vita Wellbeing Hub
      </CustomText>

      <Content>
        <CustomText font="bodyLight" size={14}>
          Type the <CustomText font="bodyBold">organisation code</CustomText>{" "}
          into the box below and select ACCESS to enter
        </CustomText>
        <SpacerColumn size={1} />

        <Input<LoginFormType>
          control={control}
          name="inviteCode"
          title={""}
          placeHolder="Organisation Code"
          rules={{ required: true }}
        />
        <SpacerColumn size={4} />

        <BigButton
          text="ACCESS"
          onPress={handleSubmit(onPressSubmit)}
          isLoading={isLoading}
          progress={progress}
        />
        <SpacerColumn size={4} />

        <CustomText font="bodyLight">
          If you don't know this code, please contact your HR Department or OH
          team. If this service is part of your cash plan or insurance policy,
          please check your policy's provider.
        </CustomText>
        <SpacerColumn size={2} />
      </Content>
    </Container>
  );
};

const Container = styled.ScrollView(({ theme: { colors, layout } }) => ({
  flex: 1,
  backgroundColor: colors.primaryBackground,
  padding: layout.padding_x4,
}));

const Content = styled.View(({ theme: { layout } }) => ({
  padding: layout.padding_x4,
  flex: 1,
}));

const Footer = styled.View(({ theme: { colors } }) => ({
  height: 70,
  width: "100%",
  backgroundColor: colors.secondary,
  justifyContent: "center",
  alignItems: "center",
}));
