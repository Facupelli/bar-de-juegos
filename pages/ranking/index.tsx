import axios from "axios";
import { io, Socket } from "socket.io-client";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

import RankingTable from "../../src/components/Ranking/Table/Table";
import RankingRow from "../../src/components/Ranking/RankingRow/RankingRow";

import {
  Consumption,
  SortedConsumption,
  Promotion,
  SortedPromotion,
  User,
} from "../../src/types/model";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../src/types/socketio";

import s from "./Ranking.module.scss";

type Props = {
  drinks: SortedConsumption[];
  games: SortedConsumption[];
  promotions: SortedPromotion[];
  users: User[];
};

const trDrinkTitle = ["Bebida", "Total"];
const trGameTitle = ["Juego", "Total"];
const trPromotionTitle = ["Promocion", "Total"];

export default function Ranking({ drinks, games, promotions, users }: Props) {
  useEffect((): any => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:3000",
      {
        path: "/api/socketio",
      }
    );

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      // setConnected(true);
    });

    socket.on("addConsumption", () => {
      console.log("ACTUALIZAR RANKING DE CONSUMICIONES");
    });

    if (socket) return () => socket.disconnect();
  }, []);

  return (
    <section>
      <h2>RANKING</h2>

      <div className={s.grid}>
        <article>
          <h5>Bebida más bebida</h5>
          <RankingTable trTitles={trDrinkTitle}>
            {drinks?.map((drink) => (
              <RankingRow
                key={drink.id}
                name={drink.name}
                total={drink.total}
              />
            ))}
          </RankingTable>
        </article>

        <article>
          <h5>Juego más jugado</h5>
          <RankingTable trTitles={trGameTitle}>
            {games?.map((game) => (
              <RankingRow key={game.id} name={game.name} total={game.total} />
            ))}
          </RankingTable>
        </article>

        <article>
          <h5>Promo más canjeada</h5>
          <RankingTable trTitles={trPromotionTitle}>
            {promotions?.map((promotion) => (
              <RankingRow
                key={promotion.id}
                name={promotion.name}
                total={promotion.total}
              />
            ))}
          </RankingTable>
        </article>

        <article>
          <h5>Jugadores con más canjes</h5>
          <RankingTable trTitles={trPromotionTitle}>
            {users?.map((user) => (
              <RankingRow
                key={user.id}
                name={user.fullName}
                total={String(user.totalPointsSpent)}
              />
            ))}
          </RankingTable>
        </article>
      </div>
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

  const usersRersponse = await axios(
    "http://localhost:3000/api/user?userRanking=true"
  );
  const users = usersRersponse.data;

  return {
    props: {
      drinks: sortedDrinks,
      games: sortedGames,
      promotions: sortedPromotions,
      users,
    },
  };
};
