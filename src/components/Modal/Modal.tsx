import { Dispatch, SetStateAction } from "react";
import XMark from "../../icons/XMark";
import s from "./Modal.module.scss";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  handleCloseModal: () => void;
  error?: boolean;
};

export default function Modal({
  children,
  isOpen,
  handleCloseModal,
  error,
}: Props) {
  return (
    <>
      <dialog open={isOpen} className={`${s.modal} ${error ? s.error : ""}`}>
        <div className={s.btn_wrapper}>
          <button role="button" type="button" onClick={handleCloseModal}>
            <XMark size={22} white />
          </button>
        </div>
        {children}
      </dialog>
      <div className={s.backdrop} role="backdrop"></div>
    </>
  );
}
