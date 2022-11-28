import axios from "axios";
import { GetServerSideProps } from "next";
import { Drink, DrinksOnUser, Game, GamesOnUser } from "../../src/types/model";

import s from "./Ranking.module.scss";

type SortedDrinks = {
  id: string;
  name: string;
  points: number;
  users: DrinksOnUser[];
  total: number;
};

type SortedGames = {
  id: string;
  name: string;
  points: number;
  users: GamesOnUser[];
  total: number;
};

type Props = {
  drinks: SortedDrinks[];
  games: SortedGames[];
};

export default function Ranking({ drinks, games }: Props) {
  console.log(drinks);
  return (
    <section>
      <h2>RANKING</h2>
      <article>
        <h5>Bebida mas bebida</h5>
        {drinks.map((drink) => (
          <div key={drink.id}>
            {drink.name} x{drink.total}
          </div>
        ))}
      </article>

      <article>
        <h5>Juego mas jugado</h5>
        {games.map((game) => (
          <div key={game.id}>
            {game.name} x{game.total}
          </div>
        ))}
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
