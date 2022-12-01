import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import s from "./Nav.module.scss";

export default function Nav() {
  const { data: session } = useSession();

  return (
    <nav className={s.nav}>
      <ul>
        {session && <li onClick={async () => await signOut()}>SALIR</li>}

        <li>
          <Link href="/">INICIO</Link>
        </li>

        {session?.user.role === "ADMIN" && (
          <li>
            <Link href="/admin">ADMIN</Link>
          </li>
        )}

        {!session && (
          <li onClick={async () => await signIn("google")}>ENTRAR</li>
        )}
      </ul>
    </nav>
  );
}
