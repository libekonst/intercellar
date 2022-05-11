import styled from '@emotion/styled';

type Props = {
  when?: boolean;
};

export const Hidden = styled.div<Props>((props) => ({
  display: props.when ? 'none' : 'initial'
}));
