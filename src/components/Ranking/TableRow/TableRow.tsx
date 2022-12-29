import { ReactNode } from "react";
import EditIcon from "../../../icons/EditIcon";
import XMark from "../../../icons/XMark";

import s from "./TableRow.module.scss";

type Props = {
  children: ReactNode;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
};

export default function TableRow({
  children,
  setOpenDeleteModal,
  setDeleteId,
  id,
}: Props) {
  return (
    <tr>
      {children}
      <td className={s.btn}>
        <EditIcon size={18} />
      </td>
      <td
        onClick={() => {
          setDeleteId(id);
          setOpenDeleteModal(true);
        }}
        className={s.btn}
      >
        <XMark size={18} />
      </td>
    </tr>
  );
}
