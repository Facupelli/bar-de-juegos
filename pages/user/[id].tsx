import { PrismaClient } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { updateUserState } from "../../src/utils/userID";

import { Consumption, User } from "../../src/types/model";

//COMPONENTS
import Nav from "../../src/components/Nav/Nav";
import MembershipCard from "../../src/components/UserDetail/MembershipCard/MembershipCard";
import AddPromotion from "../../src/components/UserDetail/AddPromotion/AddPromotion";
import Table from "../../src/components/Ranking/Table/Table";
import ButtonOnClick from "../../src/components/UI/ButtonOnClick/ButtonOnClick";
import AddConsumptionBtn from "../../src/components/UI/AddConsumptionBtn/AddConsumptionBtn";
import ConsumptionCard from "../../src/components/UserDetail/ConsumptionCard/ConsumptionCard";
import AddConsumption from "../../src/components/UserDetail/AddCosumption/AddConsumption";
import PromotionCard from "../../src/components/UserDetail/PromotionCard/PromotionCard";
import Modal from "../../src/components/Modal/Modal";

//ICONS
import KitchenTools from "../../src/icons/KitchenTools";
import PercentageIcon from "../../src/icons/PercentageIcon";
import BeerIcon from "../../src/icons/BeerIcon";
import PoolIcon from "../../src/icons/PoolIcon";

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
  userId: string;
};

const trLastConsumptionsTitles = ["consumición", "ganó?", "cantidad", "fecha"];

export default function Home({
  userData,
  consumptions,
  userConsumptions,
  userId,
}: Props) {
  const router = useRouter();

  const [user, setUser] = useState<User>(userData);
  const [error, setError] = useState<string>("");

  const [consumptionsList, setConsumptionsList] = useState(consumptions);
  const [promotions, setPromotions] = useState(user?.membership?.promotions);

  const [consumptionActive, setConsumptionActive] = useState({
    drinks: true,
    foods: false,
    games: false,
    promos: false,
  });

  const [searchInput, setSearchinput] = useState<string>("");
  const [searchPromoInput, setSearchPromoInput] = useState<string>("");

  useEffect(() => {
    if (searchInput) {
      setConsumptionsList((prev) => ({
        drinks: consumptions.drinks.filter((d) =>
          d.name.toLowerCase().includes(searchInput.toLowerCase())
        ),
        foods: consumptions.foods.filter((f) =>
          f.name.toLowerCase().includes(searchInput.toLowerCase())
        ),
        games: consumptions.games.filter((g) =>
          g.name.toLowerCase().includes(searchInput.toLowerCase())
        ),
      }));
    }
    if (!searchInput) {
      setConsumptionsList(consumptions);
    }
  }, [searchInput, consumptions]);

  useEffect(() => {
    if (searchPromoInput) {
      setPromotions(
        user.membership.promotions.filter((p) =>
          p.name.toLowerCase().includes(searchPromoInput.toLowerCase())
        )
      );
    }
    if (!searchPromoInput) {
      setPromotions(user.membership.promotions);
    }
  }, [searchPromoInput, user.membership.promotions]);

  const updateGameWinner = async (
    id: string,
    status: boolean,
    gameId: string
  ) => {
    const updateConsumption = await axios.put(
      `http://localhost:3000/api/consumptionOnUser`,
      {
        id,
        status,
      }
    );

    await axios.post(`http://localhost:3000/api/socket/gameOver`, {
      id: gameId,
    });

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
          <section className={` ${s.first_section}`}>
            <div className={s.btns_wrapper}>
              <AddConsumptionBtn
                text="BEBIDAS"
                handleClick={() => {
                  setConsumptionActive((prev) => ({
                    ...prev,
                    drinks: !consumptionActive.drinks,
                    foods: false,
                    games: false,
                    promos: false,
                  }));
                  setSearchinput("");
                }}
                active={consumptionActive.drinks}
              >
                <BeerIcon size={26} active={consumptionActive.drinks} />
              </AddConsumptionBtn>
              <AddConsumptionBtn
                text="COMIDAS"
                handleClick={() => {
                  setConsumptionActive((prev) => ({
                    ...prev,
                    foods: !consumptionActive.foods,
                    games: false,
                    promos: false,
                    drinks: false,
                  }));
                  setSearchinput("");
                }}
                active={consumptionActive.foods}
              >
                <KitchenTools size={26} active={consumptionActive.foods} />
              </AddConsumptionBtn>
              <AddConsumptionBtn
                text="JUEGOS"
                handleClick={() => {
                  setConsumptionActive((prev) => ({
                    ...prev,
                    games: !consumptionActive.games,
                    promos: false,
                    drinks: false,
                    foods: false,
                  }));
                  setSearchinput("");
                }}
                active={consumptionActive.games}
              >
                <PoolIcon size={26} active={consumptionActive.games} />
              </AddConsumptionBtn>
              <AddConsumptionBtn
                text="PROMOCIONES"
                handleClick={() => {
                  setConsumptionActive((prev) => ({
                    ...prev,
                    promos: !consumptionActive.promos,
                    games: false,
                    drinks: false,
                    foods: false,
                  }));
                  setSearchinput("");
                }}
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
                <div className={s.inputs_grid}>
                  <input
                    type="search"
                    placeholder="Buscar..."
                    onChange={(e) => setSearchinput(e.target.value)}
                  />
                  <AddConsumption
                    consumptions={consumptions.drinks}
                    name="DRINK"
                    userId={userId}
                    setUser={setUser}
                  />
                </div>
                <div className={s.consumptions_wrapper}>
                  {consumptionsList.drinks.map((drink) => (
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
                <div className={s.inputs_grid}>
                  <input
                    type="search"
                    placeholder="Buscar..."
                    onChange={(e) => setSearchinput(e.target.value)}
                  />
                  <AddConsumption
                    consumptions={consumptions.foods}
                    name="Comida"
                    userId={userId}
                    setUser={setUser}
                  />
                </div>
                <div className={s.consumptions_wrapper}>
                  {consumptionsList.foods.map((food) => (
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
                <div className={s.inputs_grid}>
                  <input
                    type="search"
                    placeholder="Buscar..."
                    onChange={(e) => setSearchinput(e.target.value)}
                  />
                  <AddConsumption
                    consumptions={consumptions.games}
                    name="Juegos"
                    userId={userId}
                    setUser={setUser}
                  />
                </div>
                <div className={s.consumptions_wrapper}>
                  {consumptionsList.games.map((game) => (
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
                <div className={s.inputs_grid}>
                  <input
                    type="search"
                    placeholder="Buscar..."
                    onChange={(e) => setSearchPromoInput(e.target.value)}
                  />
                  <AddPromotion
                    promotions={user.membership.promotions}
                    userId={userId}
                    userPoints={user.totalPoints}
                    setUser={setUser}
                  />
                </div>
                <div className={s.promotions_wrapper}>
                  {promotions?.map((promotion) => (
                    <PromotionCard
                      key={promotion.id}
                      promotion={promotion}
                      setUser={setUser}
                      userId={user.id}
                      userPoints={user.totalPoints}
                      setError={setError}
                    />
                  ))}
                  {promotions?.length === 0 && (
                    <p>Actualmente no hay promociones para tu membresía!</p>
                  )}
                </div>
              </>
            )}
          </section>

          <section className={`${s.margin_t} ${s.last_consumptions_wrapper}`}>
            <details>
              <summary>Ultimas consumiciones:</summary>
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
                                updateGameWinner(
                                  consumption.id,
                                  true,
                                  consumption.consumption.id
                                )
                              }
                              type="primary"
                            >
                              GANÓ
                            </ButtonOnClick>
                            <ButtonOnClick
                              handleClick={() =>
                                updateGameWinner(
                                  consumption.id,
                                  false,
                                  consumption.consumption.id
                                )
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
            </details>
          </section>

          <section className={`${s.margin_t} ${s.total_consumptions_wrapper}`}>
            <details>
              <summary>Consumiciones totales:</summary>
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
            </details>
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

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();
  const { id } = context.params as IParams;

  let user,
    drinkConsumptions,
    gamesConsumptions,
    foodConsumptions,
    userDrinksConsumptions,
    userGamesConsumptions,
    userFoodConsumptions;

  try {
    user = await prisma?.user.findUnique({
      where: { id },
      include: {
        membership: {
          include: {
            promotions: {
              include: {
                consumptions: { include: { consumption: true } },
                memberships: true,
              },
            },
          },
        },
        consumptions: {
          include: { consumption: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (e) {
    console.log(e);
  }

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    drinkConsumptions = await prisma?.consumption.findMany({
      where: { type: "DRINK" },
      include: { users: true },
      orderBy: { points: "asc" },
    });

    gamesConsumptions = await prisma?.consumption.findMany({
      where: { type: "GAME" },
      include: { users: true },
      orderBy: { points: "asc" },
    });

    foodConsumptions = await prisma?.consumption.findMany({
      where: { type: "FOOD" },
      include: { users: true },
      orderBy: { points: "asc" },
    });
  } catch (e) {
    console.error(e);
  }

  try {
    userDrinksConsumptions = await prisma?.consumption.findMany({
      include: { users: { where: { userId: id } } },
      where: { type: "DRINK" },
      orderBy: { points: "asc" },
    });

    userGamesConsumptions = await prisma?.consumption.findMany({
      include: { users: { where: { userId: id } } },
      where: { type: "GAME" },
      orderBy: { points: "asc" },
    });

    userFoodConsumptions = await prisma?.consumption.findMany({
      include: { users: { where: { userId: id } } },
      where: { type: "FOOD" },
      orderBy: { points: "asc" },
    });
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      userData: JSON.parse(JSON.stringify(user)),
      consumptions: {
        drinks: JSON.parse(JSON.stringify(drinkConsumptions)),
        foods: JSON.parse(JSON.stringify(foodConsumptions)),
        games: JSON.parse(JSON.stringify(gamesConsumptions)),
      },
      userConsumptions: {
        drinks: JSON.parse(JSON.stringify(userDrinksConsumptions)),
        foods: JSON.parse(JSON.stringify(userFoodConsumptions)),
        games: JSON.parse(JSON.stringify(userGamesConsumptions)),
      },
      userId: id,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({ select: { id: true } });

  return {
    paths: users?.map((user) => ({
      params: {
        id: user.id,
      },
    })),
    fallback: "blocking",
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );

//   if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
//     const id = context.query.id as string;

//     let user,
//       drinkConsumptions,
//       gamesConsumptions,
//       foodConsumptions,
//       userDrinksConsumptions,
//       userGamesConsumptions,
//       userFoodConsumptions;

//     try {
//       user = await prisma?.user.findUnique({
//         where: { id },
//         include: {
//           membership: {
//             include: {
//               promotions: {
//                 include: {
//                   consumptions: { include: { consumption: true } },
//                   memberships: true,
//                 },
//               },
//             },
//           },
//           consumptions: {
//             include: { consumption: true },
//             orderBy: { createdAt: "desc" },
//           },
//         },
//       });
//     } catch (e) {
//       console.log(e);
//     }

//     try {
//       drinkConsumptions = await prisma?.consumption.findMany({
//         where: { type: "DRINK" },
//         include: { users: true },
//         orderBy: { points: "asc" },
//       });

//       gamesConsumptions = await prisma?.consumption.findMany({
//         where: { type: "GAME" },
//         include: { users: true },
//         orderBy: { points: "asc" },
//       });

//       foodConsumptions = await prisma?.consumption.findMany({
//         where: { type: "FOOD" },
//         include: { users: true },
//         orderBy: { points: "asc" },
//       });
//     } catch (e) {
//       console.error(e);
//     }

//     try {
//       userDrinksConsumptions = await prisma?.consumption.findMany({
//         include: { users: { where: { userId: id } } },
//         where: { type: "DRINK" },
//         orderBy: { points: "asc" },
//       });

//       userGamesConsumptions = await prisma?.consumption.findMany({
//         include: { users: { where: { userId: id } } },
//         where: { type: "GAME" },
//         orderBy: { points: "asc" },
//       });

//       userFoodConsumptions = await prisma?.consumption.findMany({
//         include: { users: { where: { userId: id } } },
//         where: { type: "FOOD" },
//         orderBy: { points: "asc" },
//       });
//     } catch (e) {
//       console.error(e);
//     }

//     return {
//       props: {
//         userData: JSON.parse(JSON.stringify(user)),
//         consumptions: {
//           drinks: JSON.parse(JSON.stringify(drinkConsumptions)),
//           foods: JSON.parse(JSON.stringify(foodConsumptions)),
//           games: JSON.parse(JSON.stringify(gamesConsumptions)),
//         },
//         userConsumptions: {
//           drinks: JSON.parse(JSON.stringify(userDrinksConsumptions)),
//           foods: JSON.parse(JSON.stringify(userFoodConsumptions)),
//           games: JSON.parse(JSON.stringify(userGamesConsumptions)),
//         },
//         userId: id,
//       },
//     };
//   }

//   return {
//     redirect: {
//       destination: "/",
//       permanent: false,
//     },
//     props: {},
//   };
// };
