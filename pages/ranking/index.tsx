import axios from "axios";
import { io, Socket } from "socket.io-client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import {
  fetchConsumptions,
  fetchPromotionsRanking,
  fetchUsersByExchange,
} from "../../src/utils/fetching";
import {
  getConsumptionsReducedQuantity,
  updateDrinksState,
  updateGamesState,
} from "../../src/utils/consumption";
import {
  getPromotionsReducedQuantity,
  updatePromtoionsState,
} from "../../src/utils/promotion";

import RankingTable from "../../src/components/Ranking/Table/Table";
import RankingRow from "../../src/components/Ranking/RankingRow/RankingRow";
import Nav from "../../src/components/Nav/Nav";

import {
  SortedConsumption,
  SortedPromotion,
  User,
} from "../../src/types/model";
import {
  addConsumption,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../src/types/socketio";

import s from "./Ranking.module.scss";

type Props = {
  drinksList: SortedConsumption[];
  gamesList: SortedConsumption[];
  promotionsList: SortedPromotion[];
  usersList: User[];
};

const trDrinkTitle = ["Bebida", "Total"];
const trGameTitle = ["Juego", "Total"];
const trPromotionTitle = ["Promocion", "Total"];

export default function Ranking({
  drinksList,
  gamesList,
  promotionsList,
  usersList,
}: Props) {
  const [drinks, setDrinks] = useState<SortedConsumption[]>(drinksList);
  const [games, setGames] = useState<SortedConsumption[]>(gamesList);
  const [promotions, setPromotions] =
    useState<SortedPromotion[]>(promotionsList);
  const [users, setUsers] = useState<User[]>(usersList);

  const divRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = async () => {
    if (typeof window !== undefined && divRef.current) {
      await divRef.current.requestFullscreen();
    }
  };

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

    socket.on("addConsumption", async (data: addConsumption) => {
      if (data.consumptionType === "GAME") {
        await updateGamesState(setGames);
      }
      if (data.consumptionType === "DRINK") {
        await updateDrinksState(setDrinks);
      }
    });

    socket.on("exchangePromotion", async () => {
      await updatePromtoionsState(setPromotions);

      const updatedUsers = await fetchUsersByExchange();
      setUsers(updatedUsers);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  return (
    <div className={s.container}>
      <Head>
        <title>Bar de juegos - Ranking</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main>
        <section>
          <div className={s.grid} ref={divRef}>
            <article>
              <h5>Bebida m??s bebida</h5>
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
              <h5>Juego m??s jugado</h5>
              <RankingTable trTitles={trGameTitle}>
                {games?.map((game) => (
                  <RankingRow
                    key={game.id}
                    name={game.name}
                    total={game.total}
                  />
                ))}
              </RankingTable>
            </article>

            <article>
              <h5>Promo m??s canjeada</h5>
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
              <h5>Jugadores con m??s puntos canjeados</h5>
              <RankingTable trTitles={trPromotionTitle}>
                {users?.map((user) => (
                  <RankingRow
                    key={user.id}
                    name={user.fullName}
                    total={user.totalPointsSpent}
                  />
                ))}
              </RankingTable>
            </article>
          </div>

          <button type="submit" onClick={toggleFullScreen}>
            FULL SCREEN MODE
          </button>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const consumptions = await fetchConsumptions();

  const drinksReducedQuantity = getConsumptionsReducedQuantity(
    consumptions.drinks
  );

  const sortedDrinks = drinksReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  const gamesReducedQuantity = getConsumptionsReducedQuantity(
    consumptions.games
  );

  const sortedGames = gamesReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  const promotions = await fetchPromotionsRanking();

  const promotionsReducedQuantity = getPromotionsReducedQuantity(promotions);

  const sortedPromotions = promotionsReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  const usersRersponse = await axios(
    "http://localhost:3000/api/user?userRanking=true"
  );
  const users = usersRersponse.data;

  return {
    props: {
      drinksList: sortedDrinks,
      gamesList: sortedGames,
      promotionsList: sortedPromotions,
      usersList: users,
    },
  };
};
