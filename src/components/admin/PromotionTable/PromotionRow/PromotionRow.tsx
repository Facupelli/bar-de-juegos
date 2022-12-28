import XMark from "../../../../icons/XMark";
import { Promotion } from "../../../../types/model";
import s from "./PromotionRow.module.scss";

type Props = {
  promotion: Promotion;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setDeleteId: React.Dispatch<React.SetStateAction<string>> | undefined;
};

export default function PromotionRow({
  promotion,
  setOpenDeleteModal,
  setDeleteId,
}: Props) {
  return (
    <tr className={s.tr}>
      <td>{promotion.name}</td>
      <td>
        {promotion.memberships?.map((membership) => membership.name).join(", ")}
      </td>
      <td>
        {promotion.consumptions
          ?.filter((consumption) => consumption.consumption?.type === "DRINK")
          .map((consumption) => consumption.consumption.name)
          .join(", ")}
      </td>
      <td>
        {promotion.consumptions
          ?.filter((consumption) => consumption.consumption?.type === "GAME")
          .map((consumption) => consumption.consumption.name)
          .join(", ")}
      </td>
      <td>{promotion.discount}%</td>
      <td>{promotion.points}</td>
      {setDeleteId && setOpenDeleteModal && (
        <td
          onClick={() => {
            setDeleteId(promotion.id);
            setOpenDeleteModal(true);
          }}
          className={s.delete_btn}
        >
          <XMark size={18} />
        </td>
      )}
    </tr>
  );
}
