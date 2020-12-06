import React from "react";

type Props = {
  when?: boolean;
  children?: React.ReactNode;
};

export function Hidden({ when = true, children }: Props) {
  let cn = "hidden";
  if (!when) cn += " hidden--visible";
  return <div className={cn}>{children}</div>;
}
