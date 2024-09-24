import { ReactElement } from 'react';

interface ConditionalWrapProps {
  condition: boolean | undefined;
  wrap: (children?: ReactElement | null) => ReactElement | null;
  children: ReactElement | null;
}

export const ConditionalWrap = ({ condition, wrap, children }: ConditionalWrapProps) =>
  condition ? wrap(children) : children;
