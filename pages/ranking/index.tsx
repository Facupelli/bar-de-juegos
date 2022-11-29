import axios from "axios";
import { GetServerSideProps } from "next";
import RankingTable from "../../src/components/Ranking/Table/Table";
import RankingRow from "../../src/components/Ranking/RankingRow/RankingRow";
import {
  Consumption,
  SortedConsumption,
  Promotion,
  SortedPromotion,
} from "../../src/types/model";

import s from "./Ranking.module.scss";

type Props = {
  drinks: SortedConsumption[];
  games: SortedConsumption[];
  promotions: SortedPromotion[];
};

const trDrinkTitle = ["Bebida", "Total"];
const trGameTitle = ["Juego", "Total"];
const trPromotionTitle = ["Promocion", "Total"];

export default function Ranking({ drinks, games, promotions }: Props) {
  return (
    <section>
      <h2>RANKING</h2>

      <article>
        <h5>Bebida mas bebida</h5>
        <RankingTable trTitles={trDrinkTitle}>
          {drinks.map((drink) => (
            <RankingRow key={drink.id} name={drink.name} total={drink.total} />
          ))}
        </RankingTable>
      </article>

      <article>
        <h5>Juego mas jugado</h5>
        <RankingTable trTitles={trGameTitle}>
          {games.map((game) => (
            <RankingRow key={game.id} name={game.name} total={game.total} />
          ))}
        </RankingTable>
      </article>

      <article>
        <h5>Promo mas canjeada</h5>
        <RankingTable trTitles={trPromotionTitle}>
          {promotions.map((promotion) => (
            <RankingRow
              key={promotion.id}
              name={promotion.name}
              total={promotion.total}
            />
          ))}
        </RankingTable>
      </article>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const consumptionResponse = await axios(
    "http://localhost:3000/api/consumption"
  );
  const consumptions: { drinks: Consumption[]; games: Consumption[] } =
    consumptionResponse.data;

  const drinksReducedQuantity = consumptions.drinks.map((drink) => ({
    ...drink,
    total: drink.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));

  const sortedDrinks = drinksReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  const gamesReducedQuantity = consumptions.games.map((game) => ({
    ...game,
    total: game.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));

  const sortedGames = gamesReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  const promotionsResponse = await axios(
    "http://localhost:3000/api/promotion?ranking=true"
  );
  const promotions: Promotion[] = promotionsResponse.data;

  const promotionsReducedQuantity = promotions.map((promotion) => ({
    ...promotion,
    total: promotion.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));

  const sortedPromotions = promotionsReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  return {
    props: {
      drinks: sortedDrinks,
      games: sortedGames,
      promotions: sortedPromotions,
    },
  };
};
