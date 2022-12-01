import { Promotion } from "../../../types/model";
import Table from "../../Ranking/Table/Table";
import PromotionRow from "./PromotionRow/PromotionRow";

type Props = {
  promotions: Promotion[];
};

const trPromotionTitles = [
  "Nombre",
  "Membresias",
  "Bebidas",
  "Juegos",
  "Puntos",
];

export default function PromotionTale({ promotions }: Props) {
  return (
    <Table trTitles={trPromotionTitles}>
      {promotions?.map((promotion) => (
        <PromotionRow key={promotion.id} promotion={promotion} />
      ))}
    </Table>
  );
}
