import XMark from "../../../icons/XMark";
import { Membership } from "../../../types/model";

import s from "./MembershipRow.module.scss";

type Props = {
  membership: Membership;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
};

export default function MembershipRow({
  membership,
  setOpenDeleteModal,
  setDeleteId,
}: Props) {
  return (
    <tr className={s.tr}>
      <td>{membership.name}</td>
      <td>{membership.minPoints}</td>
      <td>{membership.maxPoints}</td>
      <td
        onClick={() => {
          setDeleteId(membership.id);
          setOpenDeleteModal(true);
        }}
        className={s.delete_btn}
      >
        <XMark size={18} />
      </td>
    </tr>
  );
}
