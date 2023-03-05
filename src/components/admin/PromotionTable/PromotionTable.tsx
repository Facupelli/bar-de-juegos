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
  "Comidas",
  "Juegos",
  "Descuento",
  "Puntos",
];

export default function PromotionTable({
  promotions,
  setOpenDeleteModal,
  setDeleteId,
}: Props) {
  console.log(promotions);

  return (
    <>
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
                  (consumption) =>
                    consumption.consumption?.consumptionCategoryId ===
                    "cleubcq1e0007e788mgknnrix"
                )
                .map((consumption) => consumption.consumption.name)
                .join(", ")}
            </td>
            <td>
              {promotion.consumptions
                ?.filter(
                  (consumption) =>
                    consumption.consumption?.consumptionCategoryId ===
                    "cleubcq1e0005e788cizbtne3"
                )
                .map((consumption) => consumption.consumption.name)
                .join(", ")}
            </td>
            <td>
              {promotion.consumptions
                ?.filter(
                  (consumption) =>
                    consumption.consumption?.consumptionCategoryId ===
                    "cleubcq1e0003e788dvrvlsyo"
                )
                .map((consumption) => consumption.consumption.name)
                .join(", ")}
            </td>
            <td>{promotion.discount}%</td>
            <td>{promotion.points}</td>
          </TableRow>
        ))}
      </Table>
    </>
  );
}
