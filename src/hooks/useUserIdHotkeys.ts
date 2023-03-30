import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";

type ConsumptionState = {
  drinks: boolean;
  foods: boolean;
  games: boolean;
  promos: boolean;
};

export const useUserIdHotkeys = (
  setConsumptionActive: Dispatch<SetStateAction<string>>,
  categories: { name: string; id: string }[]
) => {
  const router = useRouter();

  useEffect(() => {
    if (document) {
      document.onkeydown = (e) => {
        e.preventDefault();

        if (e.key === "Enter") {
          router.push("/");
        }

        if (e.key === "1") {
          setConsumptionActive("clfui8w0m0004e7643z5bwlkv");
        }
        if (e.key === "2") {
          setConsumptionActive("clfui8w0m0006e764k8w84mv2");
        }
        if (e.key === "3") {
          setConsumptionActive("clfui8w0n0008e764zwun0xfj");
        }
        if (e.key === "4") {
          setConsumptionActive("promos");
        }
      };
    }
  }, [router, setConsumptionActive]);
};
