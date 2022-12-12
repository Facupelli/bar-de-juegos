import axios from "axios";
import { io, Socket } from "socket.io-client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Consumption, Promotion, User } from "../../src/types/model";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";

//COMPONENTS
import MembershipCard from "../../src/components/UserDetail/MembershipCard/MembershipCard";
import AddPromotion from "../../src/components/UserDetail/AddPromotion/AddPromotion";
import Table from "../../src/components/Ranking/Table/Table";
import PromotionTale from "../../src/components/admin/PromotionTable/PromotionTable";

import AddConsumptionList from "../../src/components/UserDetail/AddConsumptionList/AddConsumptionList";
import ButtonOnClick from "../../src/components/UI/ButtonOnClick/ButtonOnClick";
import Nav from "../../src/components/Nav/Nav";

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../src/types/socketio";

import s from "./UserDetail.module.scss";
import { fetchUserById } from "../../src/utils/fetching";

type Props = {
  userData: User;
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
    foods: Consumption[];
  };
  userConsumptions: {
    drinks: Consumption[];
    games: Consumption[];
    foods: Consumption[];
  };
  promotions: Promotion[];
  userId: string;
};

const trLastConsumptionsTitles = ["consumicion", "cantidad", "fecha"];

export default function Home({
  userData,
  consumptions,
  userConsumptions,
  promotions,
  userId,
}: Props) {
  const router = useRouter();

  const [user, setUser] = useState(userData);

  return (
    <div className={s.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={s.main}>
        <section className={` ${s.input_section}`}>
          <div>
            <AddConsumptionList
              consumptions={consumptions}
              userId={userId}
              setUser={setUser}
            />
            <AddPromotion
              promotions={user.membership.promotions}
              userId={userId}
              userPoints={user.totalPoints}
              setUser={setUser}
            />
          </div>
          <MembershipCard user={user} />
        </section>

        <section className={s.margin_t}>
          <h4>Promociones para membresia {user.membership.name}:</h4>
          <PromotionTale promotions={user.membership.promotions} />
        </section>

        <section className={s.margin_t}>
          <h4>Consumiciones totales:</h4>
          <div className={`${s.grid} ${s.user_consumptions_section}`}>
            <article>
              {userConsumptions.drinks?.map((consumption) => (
                <div key={consumption.id}>
                  <p>
                    {consumption.name} x{consumption.users.length}
                  </p>
                </div>
              ))}
            </article>

            <article>
              {userConsumptions.games?.map((consumption) => (
                <div key={consumption.id}>
                  <p>
                    {consumption.name} x{consumption.users.length}
                  </p>
                </div>
              ))}
            </article>
          </div>
        </section>

        <section className={s.margin_t}>
          <h4>Ultimas consumiciones:</h4>
          <Table trTitles={trLastConsumptionsTitles}>
            {user.consumptions.slice(0, 10).map((consumption) => (
              <tr key={consumption.id}>
                <td>{consumption.consumption.name}</td>
                <td>{consumption.quantity}</td>
                <td>
                  {new Date(consumption.createdAt).toLocaleDateString("es-AR", {
                    year: "numeric",
                    day: "numeric",
                    month: "short",
                  })}
                  {" - "}
                  {new Date(consumption.createdAt).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </Table>
        </section>

        <div className={s.btn_wrrapper}>
          <ButtonOnClick type="secondary" handleClick={() => router.push("/")}>
            LISTO
          </ButtonOnClick>
        </div>
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

  if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
    const id = context.query.id as string;

    const user: User = await fetchUserById(id);

    const consumptionsResponse = await axios(
      "http://localhost:3000/api/consumption"
    );
    const consumptions: Consumption[] = consumptionsResponse.data;

    const userConsumptionsResponse = await axios(
      `http://localhost:3000/api/consumption?userId=${user?.id}`
    );
    const userConsumptions: Consumption[] = userConsumptionsResponse.data;

    // const promotionsResponse = await axios(
    //   `http://localhost:3000/api/promotions?membership=${user.membership}`
    // );
    // const promotions = promotionsResponse.data;

    return {
      props: {
        userData: user,
        consumptions,
        userConsumptions,
        userId: id,
        // promotions,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
    props: {},
  };
};
