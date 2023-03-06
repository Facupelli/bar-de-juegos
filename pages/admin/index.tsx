import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../db";
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { useState } from "react";
import Head from "next/head";

import { getPromotionsReducedQuantity } from "../../src/utils/promotion";
import { getConsumptionsReducedQuantity } from "../../src/utils/consumption";

import {
  SortedConsumption,
  SortedPromotion,
  User,
} from "../../src/types/model";

import Nav from "../../src/components/Nav/Nav";
import AdminLayout from "../../src/components/admin/AdminLayout/AdminLayout";
import RankingRow from "../../src/components/Ranking/RankingRow/RankingRow";
import Table from "../../src/components/Ranking/Table/Table";

import s from "./Admin.module.scss";

const trDrinkTitle = ["Bebida", "Total"];
const trGameTitle = ["Juego", "Total"];
const trPromotionTitle = ["Promoción", "Total"];

type Props = {
  drinksList: SortedConsumption[];
  gamesList: SortedConsumption[];
  promotionsList: SortedPromotion[];
  usersList: User[];
};

export default function Home({
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

  return (
    <div className={s.container}>
      <Head>
        <title>JOBS | Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav route="admin" />

      <main className={s.main}>
        <AdminLayout route="admin">
          <section className={s.flex_col}>
            <article>
              <h5>Bebida más bebida</h5>
              <Table trTitles={trDrinkTitle}>
                {drinks?.map((drink) => (
                  <RankingRow
                    key={drink.id}
                    name={drink.name}
                    total={drink.total}
                  />
                ))}
              </Table>
            </article>

            <article>
              <h5>Juego más jugado</h5>
              <Table trTitles={trGameTitle}>
                {games?.map((game) => (
                  <RankingRow
                    key={game.id}
                    name={game.name}
                    total={game.total}
                  />
                ))}
              </Table>
            </article>

            <article>
              <h5>Promo más canjeada</h5>
              <Table trTitles={trPromotionTitle}>
                {promotions?.map((promotion) => (
                  <RankingRow
                    key={promotion.id}
                    name={promotion.name}
                    total={promotion.total}
                  />
                ))}
              </Table>
            </article>

            <article>
              <h5>Jugadores con más puntos canjeados</h5>
              <Table trTitles={trPromotionTitle}>
                {users?.map((user) => (
                  <RankingRow
                    key={user.id}
                    name={user.fullName}
                    total={user.totalPointsSpent}
                  />
                ))}
              </Table>
            </article>
          </section>
        </AdminLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session?.user.role === "ADMIN" && prisma) {
    const drinkConsumptions = await prisma.consumption.findMany({
      where: { consumptionCategoryId: "cleubcq1e0007e788mgknnrix" },
      include: { users: true },
      orderBy: { points: "asc" },
    });

    const gamesConsumptions = await prisma.consumption.findMany({
      where: { consumptionCategoryId: "cleubcq1e0005e788cizbtne3" },
      include: { users: true },
      orderBy: { points: "asc" },
    });

    // const foodConsumptions = await prisma.consumption.findMany({
    //   where: { type: "FOOD" },
    //   include: { users: true },
    //   orderBy: { points: "asc" },
    // });

    const drinksReducedQuantity =
      getConsumptionsReducedQuantity(drinkConsumptions);

    const sortedDrinks = drinksReducedQuantity.sort((a, b) =>
      a.total > b.total ? -1 : 1
    );

    const gamesReducedQuantity =
      getConsumptionsReducedQuantity(gamesConsumptions);

    const sortedGames = gamesReducedQuantity.sort((a, b) =>
      a.total > b.total ? -1 : 1
    );

    const promotions = await prisma?.promotion.findMany({
      include: {
        users: true,
      },
    });

    const promotionsReducedQuantity = getPromotionsReducedQuantity(promotions);

    const sortedPromotions = promotionsReducedQuantity.sort((a, b) =>
      a.total > b.total ? -1 : 1
    );

    const users = await prisma?.user.findMany({
      orderBy: {
        totalPointsSpent: "desc",
      },
      take: 5,
    });

    return {
      props: {
        session,
        drinksList: JSON.parse(JSON.stringify(sortedDrinks)),
        gamesList: JSON.parse(JSON.stringify(sortedGames)),
        promotionsList: JSON.parse(JSON.stringify(sortedPromotions)),
        usersList: JSON.parse(JSON.stringify(users)),
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
