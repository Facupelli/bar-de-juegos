import { useState } from "react";
import { Consumption } from "../../../types/model";

import s from "./ConsumptionCard.module.scss";

export default function ConsumptionCard({
  consumption,
}: {
  consumption: Consumption;
}) {
  return (
    <div className={s.card_container}>
      <div>
        <p>{consumption.name}</p>
        <p>{consumption.points} pts</p>
      </div>
      <button>CARGAR</button>
    </div>
  );
}
