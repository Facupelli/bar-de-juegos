import { SortedConsumption } from "../../../types/model";
import s from "./RankingRow.module.scss";

type Props = {
  name: string | null;
  total: number;
};

export default function RankingRow({ name, total }: Props) {
  return (
    <tr className={s.row}>
      <td>{name}</td>
      <td>{total}</td>
    </tr>
  );
}
