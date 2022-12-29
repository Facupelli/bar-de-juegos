import { Promotion } from "../../../types/model";
import Table from "../../Ranking/Table/Table";
import TableRow from "../../Ranking/TableRow/TableRow";

type Props = {
  promotions: Promotion[];
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
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
        <TableRow
          key={promotion.id}
          id={promotion.id}
          setDeleteId={setDeleteId}
          setOpenDeleteModal={setOpenDeleteModal}
        >
          <td>{promotion.name}</td>
          <td>
            {promotion.memberships
              ?.map((membership) => membership.name)
              .join(", ")}
          </td>
          <td>
            {promotion.consumptions
              ?.filter(
                (consumption) => consumption.consumption?.type === "DRINK"
              )
              .map((consumption) => consumption.consumption.name)
              .join(", ")}
          </td>
          <td>
            {promotion.consumptions
              ?.filter(
                (consumption) => consumption.consumption?.type === "GAME"
              )
              .map((consumption) => consumption.consumption.name)
              .join(", ")}
          </td>
          <td>{promotion.discount}%</td>
          <td>{promotion.points}</td>
        </TableRow>
      ))}
    </Table>
  );
}
