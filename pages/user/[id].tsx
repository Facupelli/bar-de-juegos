import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";

import { fetchUserById } from "../../src/utils/fetching";
import { updateUserState } from "../../src/utils/userID";

import { Consumption, Promotion, User } from "../../src/types/model";

//COMPONENTS
import MembershipCard from "../../src/components/UserDetail/MembershipCard/MembershipCard";
import AddPromotion from "../../src/components/UserDetail/AddPromotion/AddPromotion";
import Table from "../../src/components/Ranking/Table/Table";
import ButtonOnClick from "../../src/components/UI/ButtonOnClick/ButtonOnClick";
import Nav from "../../src/components/Nav/Nav";
import AddConsumptionBtn from "../../src/components/UI/AddConsumptionBtn/AddConsumptionBtn";
import KitchenTools from "../../src/icons/KitchenTools";
import PercentageIcon from "../../src/icons/PercentageIcon";
import BeerIcon from "../../src/icons/BeerIcon";
import PoolIcon from "../../src/icons/PoolIcon";
import ConsumptionCard from "../../src/components/UserDetail/ConsumptionCard/ConsumptionCard";
import AddConsumption from "../../src/components/UserDetail/AddCosumption/AddConsumption";
import PromotionCard from "../../src/components/UserDetail/PromotionCard/PromotionCard";
import Modal from "../../src/components/Modal/Modal";

import s from "./UserDetail.module.scss";

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

const trLastConsumptionsTitles = ["consumición", "ganó?", "cantidad", "fecha"];

export default function Home({
  userData,
  consumptions,
  userConsumptions,
  promotions,
  userId,
}: Props) {
  const router = useRouter();

  const [user, setUser] = useState<User>(userData);
  const [error, setError] = useState<string>("");

  console.log(error);

  const [consumptionActive, setConsumptionActive] = useState({
    drinks: true,
    foods: false,
    games: false,
    promos: false,
  });

  const updateGameWinner = async (id: string, status: boolean) => {
    const updateConsumption = await axios.put(
      `http://localhost:3000/api/consumptionOnUser`,
      {
        id,
        status,
      }
    );

    if (updateConsumption.data.message === "success") {
      updateUserState(userId, setUser);
    }
  };

  return (
    <div className={s.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {error && (
        <Modal
          isOpen={error ? true : false}
          handleCloseModal={() => setError("")}
          error
        >
          <div className={s.error_wrapper}>
            <p>ERROR</p>
            <p>
              {error === "insufficient points" ? "Puntos insuficientes." : ""}
            </p>
          </div>
        </Modal>
      )}

      <Nav />

      <main className={s.main}>
        <div>
          <section className={` ${s.input_section}`}>
            <div className={s.btns_wrapper}>
              <AddConsumptionBtn
                text="BEBIDAS"
                handleClick={() =>
                  setConsumptionActive((prev) => ({
                    ...prev,
                    drinks: !consumptionActive.drinks,
                    foods: false,
                    games: false,
                    promos: false,
                  }))
                }
                active={consumptionActive.drinks}
              >
                <BeerIcon size={26} active={consumptionActive.drinks} />
              </AddConsumptionBtn>
              <AddConsumptionBtn
                text="COMIDAS"
                handleClick={() =>
                  setConsumptionActive((prev) => ({
                    ...prev,
                    foods: !consumptionActive.foods,
                    games: false,
                    promos: false,
                    drinks: false,
                  }))
                }
                active={consumptionActive.foods}
              >
                <KitchenTools size={26} active={consumptionActive.foods} />
              </AddConsumptionBtn>
              <AddConsumptionBtn
                text="JUEGOS"
                handleClick={() =>
                  setConsumptionActive((prev) => ({
                    ...prev,
                    games: !consumptionActive.games,
                    promos: false,
                    drinks: false,
                    foods: false,
                  }))
                }
                active={consumptionActive.games}
              >
                <PoolIcon size={26} active={consumptionActive.games} />
              </AddConsumptionBtn>
              <AddConsumptionBtn
                text="PROMOCIONES"
                handleClick={() =>
                  setConsumptionActive((prev) => ({
                    ...prev,
                    promos: !consumptionActive.promos,
                    games: false,
                    drinks: false,
                    foods: false,
                  }))
                }
                active={consumptionActive.promos}
              >
                <PercentageIcon size={26} active={consumptionActive.promos} />
              </AddConsumptionBtn>
            </div>
            <MembershipCard user={user} />
          </section>

          <section className={s.add_consumptions_wrapper}>
            {consumptionActive.drinks && (
              <>
                <AddConsumption
                  consumptions={consumptions.drinks}
                  name="DRINK"
                  userId={userId}
                  setUser={setUser}
                />
                <div className={s.consumptions_wrapper}>
                  {consumptions.drinks.map((drink) => (
                    <ConsumptionCard
                      name="DRINK"
                      setUser={setUser}
                      userId={user.id}
                      consumption={drink}
                      key={drink.id}
                    />
                  ))}
                </div>
              </>
            )}

            {consumptionActive.foods && (
              <>
                <AddConsumption
                  consumptions={consumptions.foods}
                  name="Comida"
                  userId={userId}
                  setUser={setUser}
                />
                <div className={s.consumptions_wrapper}>
                  {consumptions.foods.map((food) => (
                    <ConsumptionCard
                      name="FOOD"
                      setUser={setUser}
                      userId={user.id}
                      consumption={food}
                      key={food.id}
                    />
                  ))}
                </div>
              </>
            )}

            {consumptionActive.games && (
              <>
                <AddConsumption
                  consumptions={consumptions.games}
                  name="Juegos"
                  userId={userId}
                  setUser={setUser}
                />
                <div className={s.consumptions_wrapper}>
                  {consumptions.games.map((game) => (
                    <ConsumptionCard
                      name="GAME"
                      setUser={setUser}
                      userId={user.id}
                      consumption={game}
                      key={game.id}
                    />
                  ))}
                </div>
              </>
            )}

            {consumptionActive.promos && (
              <>
                <AddPromotion
                  promotions={user.membership.promotions}
                  userId={userId}
                  userPoints={user.totalPoints}
                  setUser={setUser}
                />
                <div className={s.promotions_wrapper}>
                  {user.membership.promotions?.map((promotion) => (
                    <PromotionCard
                      key={promotion.id}
                      promotion={promotion}
                      setUser={setUser}
                      userId={user.id}
                      setError={setError}
                    />
                  ))}
                </div>
              </>
            )}
          </section>

          <section className={`${s.margin_t} ${s.last_consumptions_wrapper}`}>
            <h4>Ultimas consumiciones:</h4>
            <Table trTitles={trLastConsumptionsTitles}>
              {user.consumptions.slice(0, 10).map((consumption) => (
                <tr key={consumption.id}>
                  <td>{consumption.consumption.name}</td>
                  <td>
                    {consumption.consumption.type === "GAME" &&
                      (consumption.winner === null ? (
                        <div className={s.btns_wrapper}>
                          <ButtonOnClick
                            handleClick={() =>
                              updateGameWinner(consumption.id, true)
                            }
                            type="primary"
                          >
                            GANÓ
                          </ButtonOnClick>
                          <ButtonOnClick
                            handleClick={() =>
                              updateGameWinner(consumption.id, false)
                            }
                            type="danger"
                          >
                            PERDIÓ
                          </ButtonOnClick>
                        </div>
                      ) : (
                        <div>{consumption.winner ? "SI" : "NO"}</div>
                      ))}
                  </td>
                  <td>{consumption.quantity}</td>
                  <td>
                    {new Date(consumption.createdAt).toLocaleDateString(
                      "es-AR",
                      {
                        year: "numeric",
                        day: "numeric",
                        month: "short",
                      }
                    )}
                    {" - "}
                    {new Date(consumption.createdAt).toLocaleTimeString(
                      "es-AR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          </section>

          {/* <section className={s.margin_t}>
            <h4>Promociones para membresia {user.membership.name}:</h4>
            <PromotionTale promotions={user.membership.promotions} />
          </section> */}

          <section className={`${s.margin_t} ${s.total_consumptions_wrapper}`}>
            <h4>Consumiciones totales:</h4>
            <div className={`${s.user_consumptions_section}`}>
              <Table trTitles={["Nombre", "Cantidad"]}>
                {userConsumptions.drinks?.map((consumption) => (
                  <tr key={consumption.id}>
                    <td>{consumption.name}</td>
                    <td>{consumption.users.length}</td>
                  </tr>
                ))}
              </Table>

              <Table trTitles={["Nombre", "Cantidad"]}>
                {userConsumptions.games?.map((consumption) => (
                  <tr key={consumption.id}>
                    <td>{consumption.name}</td>
                    <td>{consumption.users.length}</td>
                  </tr>
                ))}
              </Table>

              <Table trTitles={["Nombre", "Cantidad"]}>
                {userConsumptions.foods?.map((consumption) => (
                  <tr key={consumption.id}>
                    <td>{consumption.name}</td>
                    <td>{consumption.users.length}</td>
                  </tr>
                ))}
              </Table>
            </div>
          </section>

          <div className={s.btn_wrrapper}>
            <ButtonOnClick
              type="secondary"
              handleClick={() => router.push("/")}
            >
              LISTO
            </ButtonOnClick>
          </div>
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
