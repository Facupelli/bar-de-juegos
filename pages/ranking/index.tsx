import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import Nav from "../../src/components/Nav/Nav";
import RankingRow from "../../src/components/Ranking/RankingRow/RankingRow";
import Table from "../../src/components/Ranking/Table/Table";

import { Consumption } from "../../src/types/model";
import { UsersRanking } from "../../src/types/ranking";

import { toggleFullScreen } from "../../src/utils/fullScreenMode";
import { getGameRanking } from "../../src/utils/ranking";

import s from "./Ranking.module.scss";

type Props = {
  allGames: Consumption[];
};

export default function Ranking({ allGames }: Props) {
  // useEffect((): any => {
  //   const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  //     "http://localhost:3000",
  //     {
  //       path: "/api/socketio",
  //     }
  //   );

  //   socket.on("connect", () => {
  //     console.log("SOCKET CONNECTED!", socket.id);
  //     // setConnected(true);
  //   });

  //   socket.on("addConsumption", async (data: addConsumption) => {
  //     if (data.consumptionType === "GAME") {
  //       await updateGamesState(setGames);
  //     }
  //     if (data.consumptionType === "DRINK") {
  //       await updateDrinksState(setDrinks);
  //     }
  //   });

  //   socket.on("exchangePromotion", async () => {
  //     await updatePromtoionsState(setPromotions);

  //     const updatedUsers = await fetchUsersByExchange();
  //     setUsers(updatedUsers);
  //   });

  //   if (socket) return () => socket.disconnect();
  // }, []);

  const [gameActive, setGameActive] = useState<string>("");
  const [usersRanking, setUsersRanking] = useState<UsersRanking[]>();
  const [fullScreenActive, setFullScreenActive] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getFullScreenMode = () => {
      if (document.fullscreenElement) {
        setFullScreenActive(true);
      } else {
        setFullScreenActive(false);
      }
    };

    document.addEventListener("fullscreenchange", getFullScreenMode);

    return () =>
      document.removeEventListener("fullscreenchange", getFullScreenMode);
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
        <ul>
          {allGames.map((game) => (
            <li
              key={game.id}
              onClick={() => {
                getGameRanking(game.id, setUsersRanking);
                setGameActive(game.name);
              }}
            >
              {game.name}
            </li>
          ))}
        </ul>

        <div
          className={`${s.article_wrapper} ${
            fullScreenActive ? s.full_screen_active : ""
          }`}
          ref={divRef}
        >
          <article>
            <h5>RANKING {gameActive.toUpperCase()}</h5>
            <Table trTitles={["JUGADOR", "PARTIDOS GANADOS"]}>
              {usersRanking?.map((user) => (
                <RankingRow
                  key={user.id}
                  name={user.user.fullName}
                  total={user.quantity}
                />
              ))}
            </Table>
          </article>
        </div>

        <button type="submit" onClick={() => toggleFullScreen(divRef)}>
          PANTALLA COMPLETA
        </button>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios("http://localhost:3000/api/allGames");
  const allGames: Consumption[] = response.data;

  return {
    props: {
      allGames,
    },
  };
};
