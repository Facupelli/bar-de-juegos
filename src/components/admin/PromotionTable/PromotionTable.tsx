import { Promotion } from "../../../types/model";
import Table from "../../Ranking/Table/Table";
import PromotionRow from "./PromotionRow/PromotionRow";

type Props = {
  promotions: Promotion[];
  setOpenDeleteModal?:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  setDeleteId?: React.Dispatch<React.SetStateAction<string>> | undefined;
};

const trPromotionTitles = [
  "Nombre",
  "Membresias",
  "Bebidas",
  "Juegos",
  "Descuento",
  "Puntos",
];

export default function PromotionTable({
  promotions,
  setOpenDeleteModal,
  setDeleteId,
}: Props) {
  return (
    <Table trTitles={trPromotionTitles}>
      {promotions?.map((promotion) => (
        <PromotionRow
          key={promotion.id}
          promotion={promotion}
          setDeleteId={setDeleteId}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      ))}
    </Table>
  );
}
