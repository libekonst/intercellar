import { PrimaryButton, TeachingBubble } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Strings } from "./strings";
import { getScreenCenterPosition } from "./utils";

type Props = { onClick?: () => void; startedServing?: boolean };
export function TapLever({ onClick, startedServing }: Props) {
  const [bubbleVisible, setBubbleVisible] = useState(false);

  const closeBubble = () => setBubbleVisible(false);
  const openBubble = () => setBubbleVisible(true);

  useEffect(() => {
    if (startedServing) return;

    const timeoutId = setTimeout(openBubble, 2000);
    return () => clearTimeout(timeoutId);
  }, [startedServing]);

  return (
    <div style={{ position: "absolute", ...getScreenCenterPosition() }}>
      <PrimaryButton
        id="primary-cta"
        onClick={() => {
          closeBubble();
          if (onClick) onClick();
        }}
      >
        🍺 Serve Beer
      </PrimaryButton>

      {bubbleVisible && (
        <TeachingBubble
          headline={Strings.POUR_BEER_TITLE_TEACH_BUBBLE}
          target="#primary-cta"
          hasCloseButton
          onDismiss={closeBubble}
          isClickableOutsideFocusTrap
          forceFocusInsideTrap={false}
        >
          {Strings.POUR_BEER_MESSAGE_TEACH_BUBBLE}
        </TeachingBubble>
      )}
    </div>
  );
}
