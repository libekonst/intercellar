import { PrimaryButton, TeachingBubble } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Strings } from "./strings";
import { getScreenCenterPosition } from "./utils";

type Props = {
  onClick?: () => void;
  showBubble?: boolean;
};
export function BeerTap({ onClick, showBubble }: Props) {
  const [bubbleVisible, setBubbleVisible] = useState(false);

  const closeBubble = () => setBubbleVisible(false);
  const openBubble = () => setBubbleVisible(true);

  useEffect(() => {
    if (!showBubble) return;

    const timeoutId = setTimeout(openBubble, 1000);
    return () => clearTimeout(timeoutId);
  }, [showBubble]);

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
          headline={Strings.BEER_TAP_TEACH_BUBBLE_TITLE}
          target="#primary-cta"
          hasCloseButton
          onDismiss={closeBubble}
          isClickableOutsideFocusTrap
          forceFocusInsideTrap={false}
        >
          {Strings.BEER_TAP_TEACH_BUBBLE_MESSAGE}
        </TeachingBubble>
      )}
    </div>
  );
}
