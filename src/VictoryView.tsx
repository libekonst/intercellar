import React, { useMemo, useRef, useState } from "react";
import {
  useSpring,
  animated,
  config,
  useChain,
  useTransition,
  useSprings,
} from "react-spring";
import { Strings } from "./strings";
import {
  getRandomInt,
  getRandomPosition,
  getScreenCenterPosition,
  id,
} from "./utils";
import "./VictoryView.css";

type Props = {
  onPlayAgain: () => void;
};
export function VictoryView({ onPlayAgain }: Props) {
  const [backdropProps] = useSpring(() => ({
    from: { opacity: 0, transform: "scale(1)" },
    to: { opacity: 1, transform: "scale(1)" },
  }));

  const buttonRef = useRef<any>();
  const [buttonProps] = useSpring(() => ({
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    ref: buttonRef,
  }));

  const titleRef = useRef<any>();
  const [titleProps] = useSpring(() => ({
    from: { transform: "translateY(100px) scale(0)" },
    to: { transform: "translateY(0) scale(1)" },
    config: config.stiff,
    ref: titleRef,
  }));

  const confettiItems = useMemo(createConfetti, []);
  const confetti = useTransition(confettiItems, (item) => item.id, {
    from: () => ({
      opacity: 0,
      transform: "scale(0) rotate(0turn)",
      position: "absolute",
      ...getScreenCenterPosition(),
    }),
    // use fn to have a unique position for each element
    enter: () => ({
      opacity: 1,
      transform: `scale(1) rotate(${Math.random() * 2}turn)`,
      ...getRandomPosition(),
    }),
    // leave: { opacity: 0, transform: "scale(0.8)" },
    config: config.wobbly,
    trail: 20,
  });

  useChain([titleRef, buttonRef]);

  return (
    <>
      <animated.div style={backdropProps} className="backdrop">
        {confetti.map(({ item, props }) => (
          <animated.div style={props} key={item.id}>
            <animated.div className="confetti">🎉</animated.div>
          </animated.div>
        ))}
        <animated.div style={titleProps} className="victory-label">
          {Strings.VICTORY_LABEL}
        </animated.div>
        <animated.div
          style={buttonProps}
          className="victory-button"
          onClick={onPlayAgain}
        >
          {Strings.PLAY_AGAIN_BTN}
        </animated.div>
      </animated.div>
    </>
  );
}

const createConfetti = () =>
  Array(22)
    .fill(null)
    .map(() => ({ id: id() }));
