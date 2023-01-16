import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import s from "./Nav.module.scss";

type Props = {
  route?: string;
};

export default function Nav({ route }: Props) {
  const { data: session } = useSession();

  return (
    <nav className={`${s.nav} ${route === "admin" ? s.fixed : ""}`}>
      <ul>
        {session && <li onClick={async () => await signOut()}>SALIR</li>}

        <li>
          <Link href="/">INICIO</Link>
        </li>

        <li>
          <Link href="/ranking">RANKINGS</Link>
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
