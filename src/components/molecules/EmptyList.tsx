// libraries
import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

// components
import { CustomText } from '@components/atoms';
import { AnimationFadeIn } from '@components/atoms';

// styles
import { genericStyles } from '@styles/genericStyles';
import { StyleProp } from 'react-native';

interface EmptyListProps {
  style?: StyleProp<ViewStyle>;
  text: string;
}

export const EmptyList: React.FC<React.PropsWithChildren<EmptyListProps>> = ({
  text,
  style,
  children,
}) => {
  // renders
  return (
    <AnimationFadeIn style={genericStyles.fill}>
      <Container style={style}>
        <TextStyled font="bodyLight" size={16} textAlign="center">
          {text}
        </TextStyled>
        {children}
      </Container>
    </AnimationFadeIn>
  );
};

const Container = styled.View({
  ...genericStyles.fill,
  ...genericStyles.jcAiCenter,
});

const TextStyled = styled(CustomText)({
  width: 162,
});
