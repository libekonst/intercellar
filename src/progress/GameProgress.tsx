import React from 'react';
import { ProgressIndicator, Stack } from '@fluentui/react';
import { animated, useSpring } from 'react-spring';
import { Strings } from '../resources/strings';

type Props = {
  /** 0 to 1 */
  progress: number;
};

export function GameProgressView({ progress }: Props) {
  const { number } = useSpring({
    number: progress,
    from: { number: 0 }
  });

  const percentageString = number.interpolate((v) => {
    if (typeof v !== 'number') return '';
    return (v * 100).toFixed(0) + '%';
  });

  return (
    <div style={{ margin: 20, textAlign: 'center' }}>
      <ProgressIndicator
        percentComplete={progress}
        styles={{ progressBar: { color: 'pink' } }}
        description={
          <Stack tokens={{ childrenGap: '0.7rem' }} horizontal horizontalAlign="end">
            <div style={{ fontWeight: 'bold' }}>{Strings.PROGRESS_LABEL}</div>
            <animated.div>{percentageString}</animated.div>
          </Stack>
        }
      />
    </div>
  );
}
