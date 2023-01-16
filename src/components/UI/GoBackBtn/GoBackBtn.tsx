import { useRouter } from "next/router";
import ArrowLeft from "../../../icons/ArrowLeft";

import s from "./GoBackBtn.module.scss";

export default function GoBackBtn() {
  const router = useRouter();
  return (
    <div className={s.button_wrapper}>
      <button className={s.button} type="button" onClick={() => router.back()}>
        <div>
          <ArrowLeft size={30} />
        </div>
      </button>
    </div>
  );
}
