import s from "./AdminLayout.module.scss";
import AdminNav from "./AdminNav/AdminNav";

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
