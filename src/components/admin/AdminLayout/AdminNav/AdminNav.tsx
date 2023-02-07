import Link from "next/link";

import BasketIcon from "../../../../icons/BasketIcon";
import CardIcon from "../../../../icons/CardIcon";
import ChartPie from "../../../../icons/ChartPie";
import PercentageIcon from "../../../../icons/PercentageIcon";
import UsersIcon from "../../../../icons/Users";

import s from "./AdminNav.module.scss";

type Props = {
  route?: string;
};

export default function AdminNav({ route }: Props) {
  return (
    <nav className={s.nav}>
      <ul>
        <li className={`${route === "admin" ? s.active : null}`}>
          <Link href="/admin" className={s.link}>
            <div className={s.icon_wrapper}>
              <ChartPie size={22} active={route === "admin"} />
            </div>
            <p>Inicio</p>
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

        <li className={`${route === "users" ? s.active : null}`}>
          <Link href="/admin/users" className={s.link}>
            <div className={s.icon_wrapper}>
              <UsersIcon size={22} active={route === "users"} />
            </div>
            <p>Usuarios</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
