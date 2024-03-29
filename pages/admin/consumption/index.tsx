import axios from "axios";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { prisma } from "../../../db";
import { useState } from "react";

import { fetchConsumptions } from "../../../src/utils/fetching";
import { useHandleDelete } from "../../../src/hooks/useHandleDelete";

//COMPONENTS
import Nav from "../../../src/components/Nav/Nav";
import AdminLayout from "../../../src/components/admin/AdminLayout/AdminLayout";
import Table from "../../../src/components/Ranking/Table/Table";
import Modal from "../../../src/components/Modal/Modal";
import CreateConsumption from "../../../src/components/admin/CreateConsumption/CreateConsumption";
import ButtonOnClick from "../../../src/components/UI/ButtonOnClick/ButtonOnClick";
import DeleteModalChild from "../../../src/components/admin/DeleteModalChild/DeleteModalChild";
import TableRow from "../../../src/components/Ranking/TableRow/TableRow";
import EditIcon from "../../../src/icons/EditIcon";
import ConsumiptionsNav from "../../../src/components/admin/ConsumptionsNav/ConsumptionsNav";

import { Consumption, ConsumptionCategory } from "../../../src/types/model";

import s from "./ConsumptionPage.module.scss";

type Props = {
  consumptions: ConsumptionCategory[];
};

const trTitles = ["Nombre", "Puntos"];

export default function ConsumptionPage({ consumptions }: Props) {
  const [categoryActive, setCategoryActive] = useState(
    consumptions[0]?.id ?? ""
  );

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const { deleteId, setDeleteId, openDeleteModal, setOpenDeleteModal } =
    useHandleDelete();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [consumption, setConsumption] = useState<Consumption>();

  const [consumptionsList, setConsumptionsList] =
    useState<ConsumptionCategory[]>(consumptions);

  const consumptionCategories = consumptions.map((consumption) => ({
    name: consumption.name,
    id: consumption.id,
  }));

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

  const consumptionsToShow = consumptionsList.find(
    (consumption) => consumption.id === categoryActive
  );

  return (
    <div className={s.container}>
      <Head>
        <title>JOBS | Consumiciones</title>
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
            categoryId={categoryActive}
            consumptionCategories={consumptionCategories}
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

      {openEditModal && (
        <Modal
          isOpen={openEditModal}
          handleCloseModal={() => setOpenEditModal(false)}
        >
          <CreateConsumption
            setConsumptionsList={setConsumptionsList}
            setOpenCreateModal={setOpenEditModal}
            consumption={consumption}
            categoryId={categoryActive}
            consumptionCategories={consumptionCategories}
          />
        </Modal>
      )}

      <Nav route="admin" />

      <main className={s.main}>
        <AdminLayout route="consumptions">
          <section className={s.main_section}>
            <ConsumiptionsNav
              categories={consumptionCategories}
              setCategoryActive={setCategoryActive}
              categoryActive={categoryActive}
            />

            <div>
              <div className={s.btn_wrapper}>
                <ButtonOnClick
                  type="primary"
                  handleClick={() => setOpenCreateModal(true)}
                >
                  CREAR CONSUMICIÓN
                </ButtonOnClick>
              </div>

              <div className={s.table_wrapper}>
                <h4 className={s.mb_2}>
                  {
                    consumptionCategories.find(
                      (category) => category.id === categoryActive
                    )?.name
                  }
                </h4>
                <Table trTitles={trTitles}>
                  {consumptionsToShow?.consumptions?.map((consumption) => (
                    <TableRow
                      key={consumption.id}
                      id={consumption.id}
                      setDeleteId={setDeleteId}
                      setOpenDeleteModal={setOpenDeleteModal}
                    >
                      <td className={s.info}>{consumption.name}</td>
                      <td className={s.info}>{consumption.points}</td>
                      <td
                        onClick={() => {
                          setConsumption(consumption);
                          setOpenEditModal(true);
                        }}
                        className={s.btn}
                      >
                        <EditIcon size={18} />
                      </td>
                    </TableRow>
                  ))}
                </Table>
              </div>
            </div>
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

  if (session?.user.role === "ADMIN") {
    const allConsumptions = await prisma.consumptionCategory.findMany({
      include: {
        consumptions: true,
      },
    });

    return {
      props: {
        consumptions: allConsumptions,
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
