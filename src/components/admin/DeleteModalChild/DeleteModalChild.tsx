import ButtonOnClick from "../../UI/ButtonOnClick/ButtonOnClick";
import s from "./DeleteModalChild.module.scss";

export default function DeleteModalChild({
  deleteFunc,
  deleteId,
}: {
  deleteFunc: (deleteId: string) => void;
  deleteId: string;
}) {
  return (
    <div className={s.delete_modal_wrapper}>
      <h4>Seguro que quieres eliminar?</h4>
      <ButtonOnClick type="danger" handleClick={() => deleteFunc(deleteId)}>
        ELIMINAR
      </ButtonOnClick>
    </div>
  );
}
