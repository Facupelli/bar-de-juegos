import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";

import s from "./LoginInput.module.scss";

type SubmitData = {
  id: string;
};

export default function LoginInput() {
  const {
    register,
    watch,
    formState: { errors },
    setFocus,
    reset,
    setValue,
  } = useForm<SubmitData>();
  const router = useRouter();

  const [calledPush, setCalledPush] = useState(false);
  const [submitError, setError] = useState<string>("");

  const id = watch("id");

  const onSubmit = useCallback(
    async (id: string) => {
      try {
        const user = await axios(`http://localhost:3000/api/user/${id}`);
        reset({ id: "" });
        if (user) {
          setCalledPush(true);
          router.push(`/user/${id}`);
        }
      } catch (e: any) {
        console.log("catch", e.response);
        setError(e?.response?.data?.message);
        setValue("id", "");
      }
    },
    [reset, router, setValue]
  );

  useEffect(() => {
    if (id?.length === 25 && !calledPush) {
      onSubmit(id);
    }
  }, [id, calledPush, onSubmit]);

  useEffect(() => {
    setFocus("id");
  }, [setFocus, submitError]);

  return (
    <>
      {submitError && !!submitError && (
        <Modal
          isOpen={!!submitError}
          handleCloseModal={() => setError("")}
          error
        >
          <p>{submitError}</p>
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
