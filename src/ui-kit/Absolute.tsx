import styled from '@emotion/styled';

type Props = {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
};
export const Absolute = styled.div<Props>((props) => ({
  position: 'absolute',
  top: props.top ?? 'auto',
  right: props.right ?? 'auto',
  bottom: props.bottom ?? 'auto',
  left: props.left ?? 'auto'
}));
