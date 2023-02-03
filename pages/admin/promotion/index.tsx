import { PrismaClient } from "@prisma/client";
import axios from "axios";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useState } from "react";

import { fetchPromotions } from "../../../src/utils/fetching";
import { useHandleDelete } from "../../../src/hooks/useHandleDelete";

//COMPONENTS
import Nav from "../../../src/components/Nav/Nav";
import AdminLayout from "../../../src/components/admin/AdminLayout/AdminLayout";
import Modal from "../../../src/components/Modal/Modal";
import ButtonOnClick from "../../../src/components/UI/ButtonOnClick/ButtonOnClick";
import PromotionTable from "../../../src/components/admin/PromotionTable/PromotionTable";
import CreatePromotion from "../../../src/components/admin/CreatePromotion/CreatePromotion";
import DeleteModalChild from "../../../src/components/admin/DeleteModalChild/DeleteModalChild";
import PlusIcon from "../../../src/icons/PlusIcon";

import { Consumption, Membership, Promotion } from "../../../src/types/model";

import s from "./PromotionPage.module.scss";

type Props = {
  promotions: Promotion[];
  memberships: Membership[];
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
    foods: Consumption[];
  };
};

export default function PromotionPage({
  promotions,
  memberships,
  consumptions,
}: Props) {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const { deleteId, setDeleteId, openDeleteModal, setOpenDeleteModal } =
    useHandleDelete();

  const [promotionsList, setPromotionsList] = useState<Promotion[]>(promotions);

  const handleDeletePromotion = async (promotionId: string) => {
    const { data } = await axios.delete("http://localhost:3000/api/promotion", {
      data: { promotionId },
    });

    if (data.message === "success") {
      console.log("success");
      setPromotionsList(await fetchPromotions());
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className={s.container}>
      <Head>
        <title>Admin - Promociones</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {openCreateModal && (
        <Modal
          isOpen={openCreateModal}
          handleCloseModal={() => setOpenCreateModal(false)}
        >
          <CreatePromotion
            memberships={memberships}
            consumptions={consumptions}
            setOpenCreateModal={setOpenCreateModal}
            setPromotionsList={setPromotionsList}
          />
        </Modal>
      )}

      {openDeleteModal && (
        <Modal
          isOpen={openDeleteModal}
          handleCloseModal={() => setOpenDeleteModal(false)}
        >
          <DeleteModalChild
            deleteFunc={handleDeletePromotion}
            deleteId={deleteId}
          />
        </Modal>
      )}

      <Nav route="admin" />

      <main className={s.main}>
        <AdminLayout route="promotions">
          <div className={s.btn_wrapper}>
            <ButtonOnClick
              type="primary"
              handleClick={() => setOpenCreateModal(true)}
            >
              <p>CREAR PROMOCIÓN</p>
              <div>
                <PlusIcon size={22} />
              </div>
            </ButtonOnClick>
          </div>

          <div className={s.table_wrapper}>
            <h4 className={s.mb_2}>Promociones</h4>
            <PromotionTable
              promotions={promotionsList}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteId={setDeleteId}
            />
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

  const prisma = new PrismaClient();

  if (session?.user.role === "ADMIN") {
    const memberships = await prisma?.membership.findMany({
      orderBy: { minPoints: "asc" },
    });

    const drinkConsumptions = await prisma?.consumption.findMany({
      where: { type: "DRINK" },
      include: { users: true },
      orderBy: { points: "asc" },
    });

    const gamesConsumptions = await prisma?.consumption.findMany({
      where: { type: "GAME" },
      include: { users: true },
      orderBy: { points: "asc" },
    });

    const foodConsumptions = await prisma?.consumption.findMany({
      where: { type: "FOOD" },
      include: { users: true },
      orderBy: { points: "asc" },
    });

    const consumptions = {
      drinks: drinkConsumptions,
      games: gamesConsumptions,
      food: foodConsumptions,
    };

    const promotions = await prisma?.promotion.findMany({
      include: {
        users: true,
      },
    });

    return {
      props: {
        memberships: JSON.parse(JSON.stringify(memberships)),
        promotions: JSON.parse(JSON.stringify(promotions)),
        consumptions: JSON.parse(JSON.stringify(consumptions)),
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
