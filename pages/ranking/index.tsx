import axios from "axios";
import { GetServerSideProps } from "next";
import RankingTable from "../../src/components/Ranking/Table/Table";
import RankingRow from "../../src/components/Ranking/RankingRow/RankingRow";
import { Drink, Game, SortedDrinks, SortedGames } from "../../src/types/model";

import s from "./Ranking.module.scss";

type Props = {
  drinks: SortedDrinks[];
  games: SortedGames[];
};

const trDrinkTitle = ["Bebida", "Total"];
const trGameTitle = ["Juego", "Total"];

export default function Ranking({ drinks, games }: Props) {
  return (
    <section>
      <h2>RANKING</h2>

      <article>
        <h5>Bebida mas bebida</h5>
        <RankingTable trTitles={trDrinkTitle}>
          {drinks.map((drink) => (
            <RankingRow key={drink.id} row={drink} />
          ))}
        </RankingTable>
      </article>

      <article>
        <h5>Juego mas jugado</h5>
        <RankingTable trTitles={trGameTitle}>
          {games.map((game) => (
            <RankingRow key={game.id} row={game} />
          ))}
        </RankingTable>
      </article>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const drinksResponse = await axios("http://localhost:3000/api/drink");
  const drinks: Drink[] = drinksResponse.data;

  const drinksReducedQuantity = drinks.map((drink) => ({
    ...drink,
    total: drink.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));

  const sortedDrinks = drinksReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  const gamesResponse = await axios("http://localhost:3000/api/game");
  const games: Game[] = gamesResponse.data;

  const gamesReducedQuantity = games.map((game) => ({
    ...game,
    total: game.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));

  const sortedGames = gamesReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  return {
    props: {
      drinks: sortedDrinks,
      games: sortedGames,
    },
  };
};
