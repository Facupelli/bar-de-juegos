import { ReactNode } from "react";
import s from "./AddConsumptionBtn.module.scss";

type Props = {
  text: string;
  handleClick: () => void;
  active?: boolean;
  children?: ReactNode;
};

export default function AddConsumptionBtn({
  handleClick,
  text,
  active,
  children,
}: Props) {
  return (
    <button
      className={`${s.button} ${active ? s.active : ""}`}
      type="button"
      onClick={handleClick}
    >
      <div>{children}</div>
      {text}
    </button>
  );
}
