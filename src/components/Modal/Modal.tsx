import s from "./Modal.module.scss";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  handleCloseModal: () => void;
};

export default function Modal({ children, isOpen, handleCloseModal }: Props) {
  return (
    <dialog open={isOpen} className={s.modal}>
      <div className={s.btn_wrapper}>
        <button type="button" onClick={handleCloseModal}>
          X
        </button>
      </div>
      {children}
    </dialog>
  );
}
