import { useState } from "react";

export const useHandleDelete = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  return { openDeleteModal, setOpenDeleteModal, deleteId, setDeleteId };
};
