import React from "react";
import "./Scaffold.css";

type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
};
export function Scaffold({ header, body, footer }: Props) {
  return (
    <div className="scaffold">
      <header className="scaffold__header">{header}</header>
      <main className="scaffold__body">{body}</main>
    </div>
  );
}
