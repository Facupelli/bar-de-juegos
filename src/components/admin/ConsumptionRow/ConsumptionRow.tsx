import { Consumption } from "../../../types/model";
import s from "./ConsumptionRow.module.scss";

type Props = {
  consumption: Consumption;
};

export default function ConsumptionRow({ consumption }: Props) {
  return (
    <tr className={s.row}>
      <td>{consumption.name}</td>
      <td>{consumption.points}</td>
    </tr>
  );
}
