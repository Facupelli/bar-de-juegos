import { ReactNode } from "react";

import s from "./Button.module.scss";

type Props = {
  type: "primary" | "secondary" | "danger";
  operation: "submit" | "button";
  children: ReactNode;
};

export default function Button({ type, children, operation }: Props) {
  return (
    <button
      type={operation}
      className={`${s.button} ${type === "primary" ? s.primary : ""} ${
        type === "secondary" ? s.secondary : ""
      } ${type === "danger" ? s.danger : ""}`}
    >
      {children}
    </button>
  );
}
