import { ReactNode } from "react";
import EditIcon from "../../../icons/EditIcon";
import TrashIcon from "../../../icons/TrashIcon";
import XMark from "../../../icons/XMark";
import { Consumption, Membership, Promotion } from "../../../types/model";

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
      <td
        onClick={() => {
          setDeleteId(id);
          setOpenDeleteModal(true);
        }}
        className={s.btn}
      >
        <TrashIcon />
      </td>
    </tr>
  );
}
