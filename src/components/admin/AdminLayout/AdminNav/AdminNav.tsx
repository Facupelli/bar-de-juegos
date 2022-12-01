import Link from "next/link";

import s from "./AdminNav.module.scss";

export default function AdminNav() {
  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <Link href="/admin">Inicio Admin</Link>
        </li>
        <li>
          <Link href="/admin/membership">Membresías</Link>
        </li>
        <li>
          <Link href="/admin/consumption">Consumiciones</Link>
        </li>
        <li>
          <Link href="/admin/promotion">Promociones</Link>
        </li>
      </ul>
    </nav>
  );
}
