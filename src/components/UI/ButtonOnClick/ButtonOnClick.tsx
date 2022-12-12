import { ReactNode } from "react";

import s from "./ButtonOnClick.module.scss";

type Props = {
  children: ReactNode;
  handleClick: () => void;
  type: "danger" | "primary" | "secondary";
};

export default function ButtonOnClick({ handleClick, children, type }: Props) {
  return (
    <button
      className={`${s.button} ${type === "primary" ? s.primary : ""} ${
        type === "secondary" ? s.secondary : ""
      } ${type === "danger" ? s.danger : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
