import { PrismaClient } from "@prisma/client";
import axios from "axios";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useState } from "react";

import { fetchMemberships } from "../../../src/utils/fetching";
import { useHandleDelete } from "../../../src/hooks/useHandleDelete";

//COMPONENTS
import Nav from "../../../src/components/Nav/Nav";
import Table from "../../../src/components/Ranking/Table/Table";
import AdminLayout from "../../../src/components/admin/AdminLayout/AdminLayout";
import Modal from "../../../src/components/Modal/Modal";
import ButtonOnClick from "../../../src/components/UI/ButtonOnClick/ButtonOnClick";
import CreateMembership from "../../../src/components/admin/CreateMembership/CreateMembership";
import DeleteModalChild from "../../../src/components/admin/DeleteModalChild/DeleteModalChild";
import TableRow from "../../../src/components/Ranking/TableRow/TableRow";
import EditIcon from "../../../src/icons/EditIcon";

import { Membership } from "../../../src/types/model";

import s from "./MembershipPage.module.scss";

type Props = {
  memberships: Membership[];
};

const trTitles = ["Nombre", "Puntos Mínimos", "Puntos Máximos"];

export default function MembershipPage({ memberships }: Props) {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const { deleteId, setDeleteId, openDeleteModal, setOpenDeleteModal } =
    useHandleDelete();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [membership, setMembership] = useState<Membership>();

  const [membershipsList, setMembershipsList] =
    useState<Membership[]>(memberships);

  const handleDeleteMembership = async (membershipId: string) => {
    const { data } = await axios.delete(
      "http://localhost:3000/api/membership",
      { data: { membershipId } }
    );

    if (data.message === "success") {
      console.log("success");
      setMembershipsList(await fetchMemberships());
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className={s.container}>
      <Head>
        <title>Admin - Membresíás</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {openCreateModal && (
        <Modal
          isOpen={openCreateModal}
          handleCloseModal={() => setOpenCreateModal(false)}
        >
          <CreateMembership
            setMembershipsList={setMembershipsList}
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
            deleteFunc={handleDeleteMembership}
            deleteId={deleteId}
          />
        </Modal>
      )}

      {openEditModal && (
        <Modal
          isOpen={openEditModal}
          handleCloseModal={() => setOpenEditModal(false)}
        >
          <CreateMembership
            setMembershipsList={setMembershipsList}
            setOpenCreateModal={setOpenCreateModal}
            membership={membership}
          />
        </Modal>
      )}

      <Nav route="admin" />

      <main className={s.main}>
        <AdminLayout route="memberships">
          <section>
            <div className={s.btn_wrapper}>
              <ButtonOnClick
                type="primary"
                handleClick={() => setOpenCreateModal(true)}
              >
                CREAR MEMBRESÍA
              </ButtonOnClick>
            </div>

            <div className={s.table_wrapper}>
              <h4 className={s.mb_2}>Membresías</h4>
              <Table trTitles={trTitles}>
                {membershipsList.map((membership) => (
                  <TableRow
                    key={membership.id}
                    id={membership.id}
                    setDeleteId={setDeleteId}
                    setOpenDeleteModal={setOpenDeleteModal}
                  >
                    <td>{membership.name}</td>
                    <td>{membership.minPoints}</td>
                    <td>{membership.maxPoints}</td>
                    <td
                      onClick={() => {
                        setMembership(membership);
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

  const prisma = new PrismaClient();

  if (session?.user.role === "ADMIN") {
    const memberships = await prisma?.membership.findMany({
      orderBy: { minPoints: "asc" },
    });

    return {
      props: {
        memberships,
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
