import Link from "next/link";
import BasketIcon from "../../../../icons/BasketIcon";
import CardIcon from "../../../../icons/CardIcon";
import PercentageIcon from "../../../../icons/PercentageIcon";

import s from "./AdminNav.module.scss";

type Props = {
  route?: string;
};

export default function AdminNav({ route }: Props) {
  console.log(route);
  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <Link href="/admin" className={s.link}>
            Inicio Admin
          </Link>
        </li>

        <li className={`${route === "memberships" ? s.active : null}`}>
          <Link href="/admin/membership" className={s.link}>
            <div className={s.icon_wrapper}>
              <CardIcon size={22} active={route === "memberships"} />
            </div>
            <p>Membresías</p>
          </Link>
        </li>

        <li className={`${route === "consumptions" ? s.active : null}`}>
          <Link href="/admin/consumption" className={s.link}>
            <div className={s.icon_wrapper}>
              <BasketIcon size={22} active={route === "consumptions"} />
            </div>
            <p>Consumiciones</p>
          </Link>
        </li>

        <li className={`${route === "promotions" ? s.active : null}`}>
          <Link href="/admin/promotion" className={s.link}>
            <div className={s.icon_wrapper}>
              <PercentageIcon size={22} active={route === "promotions"} />
            </div>
            <p>Promociones</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
