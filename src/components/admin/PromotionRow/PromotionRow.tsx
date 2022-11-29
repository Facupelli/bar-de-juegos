import { ConsumptionType } from "@prisma/client";
import { Promotion } from "../../../types/model";
import s from "./PromotionRow.module.scss";

type Props = {
  promotion: Promotion;
};

export default function PromotionRow({ promotion }: Props) {
  return (
    <tr className={s.row}>
      <td>{promotion.name}</td>
      <td>
        {promotion.memberships.map((membership) => membership.name).join(", ")}
      </td>
      <td>
        {promotion.consumptions
          .filter((consumption) => consumption.type === "DRINK")
          .map((consumption) => consumption.name)
          .join(", ")}
      </td>
      <td>
        {promotion.consumptions
          .filter((consumption) => consumption.type === "GAME")
          .map((consumption) => consumption.name)
          .join(", ")}
      </td>
    </tr>
  );
}
