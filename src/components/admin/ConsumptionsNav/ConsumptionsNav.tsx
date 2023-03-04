import { SetStateAction } from "react";
import { ConsumptionCategory } from "../../../types/model";
import s from "./ConsumptionsNav.module.scss";

type Props = {
  categories: ConsumptionCategory[];
  setCategoryActive: React.Dispatch<SetStateAction<string>>;
  categoryActive: string;
};

export default function ConsumiptionsNav({
  categories,
  setCategoryActive,
  categoryActive,
}: Props) {
  return (
    <nav className={s.nav}>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => setCategoryActive(category.id)}
            className={`${categoryActive === category.id ? s.active : ""}`}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}
