import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";

import s from "./LoginInput.module.scss";

type SubmitData = {
  id: string;
};

export default function LoginInput() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<SubmitData>();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const id = watch("id");

  const onSubmit = async (id: string) => {
    try {
      const user = await axios(`http://localhost:3000/api/user/${id}`);
      reset({ id: "" });
      if (user) {
        router.push(`/user/${id}`);
      }
    } catch (e: any) {
      console.log("catch", e.response);
      setError(e?.response?.data?.message);
    }
  };

  if (id?.length === 25) {
    onSubmit(id);
  }

  useEffect(() => {
    setFocus("id");
  }, [setFocus, error]);

  return (
    <>
      {error && (
        <Modal isOpen={!!error} handleCloseModal={() => setError("")}>
          <p>{error}</p>
        </Modal>
      )}
      <form>
        <section className={s.section}>
          <input type="password" {...register("id")} autoFocus />
        </section>
      </form>
    </>
  );
}
