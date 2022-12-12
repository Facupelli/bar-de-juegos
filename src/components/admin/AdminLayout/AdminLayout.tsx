import AdminNav from "./AdminNav/AdminNav";

import s from "./AdminLayout.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className={s.admin_layout}>
      <AdminNav />
      <div>{children}</div>
    </div>
  );
}
