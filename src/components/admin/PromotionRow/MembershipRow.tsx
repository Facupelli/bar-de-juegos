import { Promotion } from "../../../types/model";
import s from "./PromotionRow.module.scss";

type Props = {
  promotion: Promotion;
};

export default function PromotionRow({ promotion }: Props) {
  return (
    <tr className={s.row}>
      <td>{promotion.name}</td>
      <td>{promotion.memberships.map((membership) => membership.name)}</td>
      <td>{promotion.drinks.map((drink) => drink.name)}</td>
      <td>{promotion.games.map((game) => game.name)}</td>
    </tr>
  );
}
