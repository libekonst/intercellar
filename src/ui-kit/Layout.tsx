import styled from '@emotion/styled';

type JustifyContent =
  | 'left'
  | 'right'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'stretch'
  | 'center'
  | 'flex-end'
  | 'flex-start';

type AlignItems =
  | 'stretch'
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'self-end'
  | 'self-start'
  | 'baseline';

type Props = {
  mainAxis?: JustifyContent;
  crossAxis?: AlignItems;
};
export const Column = styled.div<Props>((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: props.mainAxis ?? 'center',
  alignItems: props.crossAxis ?? 'center'
}));

export const Row = styled.div<Props>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: props.mainAxis ?? 'center',
  alignItems: props.crossAxis ?? 'center'
}));
