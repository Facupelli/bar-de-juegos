import { useEffect, createRef } from "react";
import { use3dcard } from "../../../hooks/3dcard";
import { User } from "../../../types/model";
import s from "./MembershipCard.module.scss";

type Props = {
  user: User;
};

export default function MembershipCard({ user }: Props) {
  const wrapperRef = createRef<HTMLDivElement>();
  const ticketRef = createRef<HTMLDivElement>();

  // use3dcard(wrapperRef, ticketRef);

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <div className={s.ticket} ref={ticketRef}>
        <div className={s.bg}></div>
        <p className={s.membership_name}>
          <strong>{user.membership.name}</strong>
        </p>
        <p className={s.text_align_right}>{user.membership.minPoints}pts</p>
        <div className={s.margin_t}>
          <p>{user.fullName}</p>
          <p>
            <strong>Puntos:</strong> {user.totalPoints}
          </p>
          <p>
            <strong>Puntos Gastados:</strong> {user.totalPointsSpent}
          </p>
        </div>
      </div>
    </div>
  );
}
