import { Membership } from "../../../types/model";

type Props = {
  membership: Membership;
};

export default function MembershipRow({ membership }: Props) {
  return (
    <tr>
      <td>{membership.name}</td>
      <td>{membership.minPoints}</td>
    </tr>
  );
}
