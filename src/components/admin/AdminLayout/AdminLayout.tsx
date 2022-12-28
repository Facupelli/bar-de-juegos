import AdminNav from "./AdminNav/AdminNav";

import s from "./AdminLayout.module.scss";

type Props = {
  children: React.ReactNode;
  route?: string;
};

export default function AdminLayout({ children, route }: Props) {
  return (
    <div className={s.admin_layout}>
      <AdminNav route={route} />
      <div>{children}</div>
    </div>
  );
}
