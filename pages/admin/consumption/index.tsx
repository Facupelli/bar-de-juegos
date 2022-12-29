import axios from "axios";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useState } from "react";
import { fetchConsumptions } from "../../../src/utils/fetching";

//COMPONENTS
import Nav from "../../../src/components/Nav/Nav";
import AdminLayout from "../../../src/components/admin/AdminLayout/AdminLayout";
import Table from "../../../src/components/Ranking/Table/Table";
import ConsumptionRow from "../../../src/components/admin/ConsumptionRow/ConsumptionRow";
import Modal from "../../../src/components/Modal/Modal";
import CreateConsumption from "../../../src/components/admin/CreateConsumption/CreateConsumption";
import ButtonOnClick from "../../../src/components/UI/ButtonOnClick/ButtonOnClick";
import DeleteModalChild from "../../../src/components/admin/DeleteModalChild/DeleteModalChild";

import { Consumption } from "../../../src/types/model";

import s from "./ConsumptionPage.module.scss";

type Props = {
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
    foods: Consumption[];
  };
};

const trTitles = ["Nombre", "Puntos"];

export default function ConsumptionPage({ consumptions }: Props) {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const [consumptionsList, setConsumptionsList] = useState<{
    drinks: Consumption[];
    games: Consumption[];
    foods: Consumption[];
  }>(consumptions);

  const handleDeleteConsumption = async (consumptionId: string) => {
    const { data } = await axios.delete(
      "http://localhost:3000/api/consumption",
      { data: { consumptionId } }
    );

    if (data.message === "success") {
      console.log("success");
      setConsumptionsList(await fetchConsumptions());
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className={s.container}>
      <Head>
        <title>Admin - Consumiciones</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {openCreateModal && (
        <Modal
          isOpen={openCreateModal}
          handleCloseModal={() => setOpenCreateModal(false)}
        >
          <CreateConsumption
            setConsumptionsList={setConsumptionsList}
            setOpenCreateModal={setOpenCreateModal}
          />
        </Modal>
      )}

      {openDeleteModal && (
        <Modal
          isOpen={openDeleteModal}
          handleCloseModal={() => setOpenDeleteModal(false)}
        >
          <DeleteModalChild
            deleteFunc={handleDeleteConsumption}
            deleteId={deleteId}
          />
        </Modal>
      )}

      <Nav />

      <main className={s.main}>
        <AdminLayout route="consumptions">
          <div className={s.btn_wrapper}>
            <ButtonOnClick
              type="primary"
              handleClick={() => setOpenCreateModal(true)}
            >
              CREAR CONSUMICIÓN
            </ButtonOnClick>
          </div>

          <div className={s.table_wrapper}>
            <h4 className={s.mb_2}>Bebidas</h4>
            <Table trTitles={trTitles}>
              {consumptionsList.drinks.map((consumption) => (
                <ConsumptionRow
                  key={consumption.id}
                  consumption={consumption}
                  setOpenDeleteModal={setOpenDeleteModal}
                  setDeleteId={setDeleteId}
                />
              ))}
            </Table>
          </div>

          <div className={s.table_wrapper}>
            <h4 className={s.mb_2}>Comidas</h4>
            <Table trTitles={trTitles}>
              {consumptionsList.foods.map((consumption) => (
                <ConsumptionRow
                  key={consumption.id}
                  consumption={consumption}
                  setOpenDeleteModal={setOpenDeleteModal}
                  setDeleteId={setDeleteId}
                />
              ))}
            </Table>
          </div>

          <div className={s.table_wrapper}>
            <h4 className={s.mb_2}>Juegos</h4>
            <Table trTitles={trTitles}>
              {consumptionsList.games.map((consumption) => (
                <ConsumptionRow
                  key={consumption.id}
                  consumption={consumption}
                  setOpenDeleteModal={setOpenDeleteModal}
                  setDeleteId={setDeleteId}
                />
              ))}
            </Table>
          </div>
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

  if (session?.user.role === "ADMIN") {
    const consumptionsResponse = await axios(
      "http://localhost:3000/api/consumption"
    );
    const consumptions = consumptionsResponse.data;

    return {
      props: {
        consumptions,
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
