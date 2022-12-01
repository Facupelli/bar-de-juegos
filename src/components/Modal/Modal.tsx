import s from "./Modal.module.scss";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

export default function Modal({ children, isOpen }: Props) {
  return (
    <dialog open={isOpen} className={s.modal}>
      {children}
    </dialog>
  );
}
