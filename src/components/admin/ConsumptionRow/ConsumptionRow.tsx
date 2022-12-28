import XMark from "../../../icons/XMark";
import { Consumption } from "../../../types/model";

import s from "./ConsumptionRow.module.scss";

type Props = {
  consumption: Consumption;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
};

export default function ConsumptionRow({
  consumption,
  setOpenDeleteModal,
  setDeleteId,
}: Props) {
  return (
    <tr className={s.row}>
      <td>{consumption.name}</td>
      <td>{consumption.points}</td>
      <td
        onClick={() => {
          setDeleteId(consumption.id);
          setOpenDeleteModal(true);
        }}
        className={s.delete_btn}
      >
        <XMark size={18} />
      </td>
    </tr>
  );
}
