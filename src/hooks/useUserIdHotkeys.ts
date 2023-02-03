import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";

type ConsumptionState = {
  drinks: boolean;
  foods: boolean;
  games: boolean;
  promos: boolean;
};

export const useUserIdHotkeys = (
  setConsumptionActive: Dispatch<SetStateAction<ConsumptionState>>
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
          setConsumptionActive((prev: ConsumptionState) => ({
            ...prev,
            drinks: true,
            foods: false,
            games: false,
            promos: false,
          }));
        }
        if (e.key === "2") {
          setConsumptionActive((prev: ConsumptionState) => ({
            ...prev,
            drinks: false,
            foods: true,
            games: false,
            promos: false,
          }));
        }
        if (e.key === "3") {
          setConsumptionActive((prev: ConsumptionState) => ({
            ...prev,
            drinks: false,
            foods: false,
            games: true,
            promos: false,
          }));
        }
        if (e.key === "4") {
          setConsumptionActive((prev: ConsumptionState) => ({
            ...prev,
            drinks: false,
            foods: false,
            games: false,
            promos: true,
          }));
        }
      };
    }
  }, []);
};
