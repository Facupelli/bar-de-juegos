import { useSession, signIn, signOut } from "next-auth/react";

import s from "./Nav.module.scss";

export default function Nav() {
  const { data: session } = useSession();
  console.log(session?.user?.role);

  return (
    <nav className={s.nav}>
      <ul>
        {session && <li onClick={async () => await signOut()}>SALIR</li>}
        {session?.user.role === "ADMIN" && <li>ADMIN</li>}
        {!session && (
          <li onClick={async () => await signIn("google")}>ENTRAR</li>
        )}
      </ul>
    </nav>
  );
}
