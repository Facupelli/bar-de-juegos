import { ReactNode } from "react";
import s from "./AddConsumptionBtn.module.scss";

type Props = {
  text: string;
  handleClick: () => void;
  categoryId: string;
  active?: string;
  children?: ReactNode;
};

export default function AddConsumptionBtn({
  handleClick,
  text,
  categoryId,
  active,
  children,
}: Props) {
  return (
    <button
      className={`${s.button} ${categoryId === active ? s.active : ""}`}
      type="button"
      onClick={handleClick}
    >
      <div>{children}</div>
      {text}
    </button>
  );
}
