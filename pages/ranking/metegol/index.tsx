import axios from "axios";
import { io, Socket } from "socket.io-client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import { updateGameRankingState } from "../../../src/utils/ranking";

import RankingTable from "../../../src/components/Ranking/Table/Table";
import RankingRow from "../../../src/components/Ranking/RankingRow/RankingRow";
import Nav from "../../../src/components/Nav/Nav";
import GoBackBtn from "../../../src/components/UI/GoBackBtn/GoBackBtn";

import {
  SortedConsumption,
  SortedPromotion,
  User,
} from "../../../src/types/model";
import {
  ClientToServerEvents,
  GameOver,
  ServerToClientEvents,
} from "../../../src/types/socketio";
import { UsersRanking } from "../../../src/types/ranking";

import s from "./Metegol.module.scss";

type Props = {
  drinksList: SortedConsumption[];
  gamesList: SortedConsumption[];
  promotionsList: SortedPromotion[];
  usersList: User[];
  ranking: UsersRanking[];
};

export default function Ranking({ ranking }: Props) {
  const [gameRanking, setGameRanking] = useState<UsersRanking[]>(ranking);

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

    socket.on("gameOver", async (data: GameOver) => {
      console.log(data);
      await updateGameRankingState(setGameRanking, data);
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
        <GoBackBtn />

        <section>
          <div className={s.grid} ref={divRef}>
            <article>
              <h5>RANKING METEGOL</h5>
              <RankingTable trTitles={["JUGADOR", "PARTDIOS GANADOS"]}>
                {gameRanking?.map((ranking) => (
                  <RankingRow
                    key={ranking.id}
                    name={ranking.user.fullName}
                    total={ranking.quantity}
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
  const usersGamesRanking = await axios(
    "http://localhost:3000/api/ranking?gameId=clc9ogvyu0014e7skwl6ges1z"
  );
  const ranking = usersGamesRanking.data;

  return {
    props: {
      ranking,
    },
  };
};
