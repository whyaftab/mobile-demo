// libraries
import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

// components
import { CustomIcon, CustomText, DivColumn } from "@components/atoms";
import { ChangeIcon } from "@navigation/components";

// misc
import { genericStyles } from "@styles/genericStyles";
import { useDynamicHeader } from "@context/DynamicHeaderProvider";

// types
export type HeaderProps = {
  title: string;
  enableRightChevron?: boolean;
  rightIcon?: () => React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  enableRightChevron,
  rightIcon,
}) => {
  // variables
  const { canGoBack, goBack } = useNavigation();
  const { toggleRightChevron } = useDynamicHeader();

  // functions

  // renders
  return (
    <Container>
      <DivColumn width={40}>
        <CustomIcon
          onPress={goBack}
          name="chevron-left"
          size={30}
          color="text"
        />
      </DivColumn>

      <TitleContainer>
        <CustomText style={styles.headerTitle} font="bodyBold" size={18}>
          {title}
        </CustomText>
      </TitleContainer>

      <DivColumn width={40} alignItems="flex-end">
        {enableRightChevron && !rightIcon && (
          <ChangeIcon onPress={toggleRightChevron} />
        )}
        {rightIcon && rightIcon()}
      </DivColumn>
    </Container>
  );
};

const Container = styled.View(({ theme: { colors, layout } }) => ({
  ...genericStyles.jcAiCenter,
  ...genericStyles.rowWithSB,
  ...genericStyles.shadow,
  height: 60,
  width: "100%",
  backgroundColor: colors.primary,
  borderBottomWidth: 1,
  borderBottomColor: colors.secondary,
  paddingHorizontal: layout.padding_x2,
}));

const TitleContainer = styled.View(({ theme: { colors, layout } }) => ({
  flex: 1,
  ...genericStyles.jcAiCenter,
}));

const styles = StyleSheet.create({
  headerTitle: {
    textTransform: "capitalize",
  },
});
