import s from "./Modal.module.scss";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  handleCloseModal: () => void;
};

export default function Modal({ children, isOpen, handleCloseModal }: Props) {
  return (
    <dialog open={isOpen} className={s.modal}>
      <button type="button" onClick={handleCloseModal}>
        X
      </button>
      {children}
    </dialog>
  );
}
