import React, { useEffect, useState } from "react";
import "./ServingHub.css";
import { animated, config, useTransition } from "react-spring";
import {
  createServing,
  mapServingToEmoji,
  Serving,
  ServingTypes,
} from "./Serving";
import { getRandomPosition, getScreenCenterPosition } from "./utils";

type Props = {
  totalServings: number;
  preference: ServingTypes;
};

export function ServingsHub({ totalServings }: Props) {
  // Servings state
  const [activeServings, setActiveServings] = useState<Serving[]>([]);
  const addServing = () =>
    setActiveServings((prev) => [...prev, createServing(ServingTypes.LAGER)]);
  const removeServing = (serving: Serving) =>
    setActiveServings((prev) => prev.filter((it) => it.id !== serving.id));

  useEffect(() => {
    if (totalServings === 0) return;
    addServing();
  }, [totalServings]); // Add more servings as totalServings increases

  const transitioningServings = useTransition(
    activeServings,
    (item) => item.id,
    {
      from: {
        opacity: 0,
        transform: "scale(0.5)",
        position: "absolute",
        ...getScreenCenterPosition(),
      },
      enter: {
        opacity: 1,
        transform: "scale(1.5)",
        transformOrigin: "center",
        position: "absolute",
        ...getRandomPosition(),
      },
      leave: { opacity: 0, transform: "scale(0.8)" },
      config: config.stiff,
      // @ts-ignore works, error in types
      onRest: (item: Serving) => removeServing(item), // when animation ends, remove from state to unmount
    }
  );

  return (
    <>
      {transitioningServings.map(({ item, props }) => (
        <animated.div key={item.id} style={props}>
          <ServingItem servingType={item.serving} />
        </animated.div>
      ))}
    </>
  );
}

type ItemProps = {
  servingType: ServingTypes;
};
function ServingItem({ servingType }: ItemProps) {
  return <p className="serving-item">{mapServingToEmoji(servingType)}</p>;
}
