import { Membership } from "../../../types/model";

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
    <tr>
      <td>{membership.name}</td>
      <td>{membership.minPoints}</td>
      <td
        onClick={() => {
          setDeleteId(membership.id);
          setOpenDeleteModal(true);
        }}
      >
        X
      </td>
    </tr>
  );
}
