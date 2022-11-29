import { SortedDrinks, SortedGames } from "../../../types/model";
import s from "./RankingRow.module.scss";

type Props = {
  row: SortedDrinks | SortedGames;
};

export default function RankingRow({ row }: Props) {
  return (
    <tr className={s.row}>
      <td>{row.name}</td>
      <td>{row.total}</td>
    </tr>
  );
}
