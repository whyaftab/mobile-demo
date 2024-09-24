// libraries
import React from 'react';
import styled from 'styled-components/native';

// components
import { CustomPressable, CustomPressableProps } from './CustomPressable';
import { CustomText } from './CustomText';

// misc
import { genericStyles } from '@styles/genericStyles';

export interface SmallButtonProps extends CustomPressableProps {
  title: string;
}

export const SmallButton = ({ title, ...restProps }: SmallButtonProps) => {
  // renders
  return (
    <Button pressableStyle={genericStyles.selfCenter} {...restProps}>
      <CustomText color="white" font="bodyBold">
        {title}
      </CustomText>
    </Button>
  );
};

const Button = styled(CustomPressable)(({ theme: { colors, layout } }) => ({
  ...genericStyles.jcAiCenter,
  backgroundColor: colors.primary,
  paddingVertical: layout.padding_x0_5,
  paddingHorizontal: layout.padding_x1,
  borderRadius: 20,
}));
