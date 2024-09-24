// libraries
import React from 'react';
import styled from 'styled-components/native';

// styles
import { genericStyles } from '@styles/genericStyles';

// types
interface Props {
  children: React.ReactNode;
}

export const StickyBottom = ({ children }: Props): React.ReactElement => {
  // renders
  return <Container>{children}</Container>;
};

const Container = styled.View({
  ...genericStyles.stickyBottom,
});
