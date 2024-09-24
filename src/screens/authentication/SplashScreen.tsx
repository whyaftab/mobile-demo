// libraries
import React from 'react';
import styled from 'styled-components/native';

// components
import { Loading } from '@components/atoms';

// misc
import { genericStyles } from '@styles/genericStyles';

export const SplashScreen = () => {
  return (
    <Container>
      <Loading size="large" />
    </Container>
  );
};

const Container = styled.View(() => ({
  ...genericStyles.fullContentCenter,
}));
