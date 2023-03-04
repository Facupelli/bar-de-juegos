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
          setConsumptionActive("cleubcq1e0003e788dvrvlsyo");
        }
        if (e.key === "2") {
          setConsumptionActive("cleubcq1e0005e788cizbtne3");
        }
        if (e.key === "3") {
          setConsumptionActive("cleubcq1e0007e788mgknnrix");
        }
        if (e.key === "4") {
          setConsumptionActive("promos");
        }
      };
    }
  }, []);
};
