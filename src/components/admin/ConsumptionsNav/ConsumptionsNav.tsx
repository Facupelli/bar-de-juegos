import s from "./ConsumptionsNav.module.scss";

type Props = {
  setShowDrinks: () => void;
  setShowGames: () => void;
  setShowFood: () => void;
  showConsumption: {
    drinks: boolean;
    games: boolean;
    food: boolean;
  };
};

export default function ConsumiptionsNav({
  setShowDrinks,
  setShowFood,
  setShowGames,
  showConsumption,
}: Props) {
  return (
    <nav className={s.nav}>
      <ul>
        <li
          onClick={setShowDrinks}
          className={`${showConsumption.drinks ? s.active : ""}`}
        >
          Bebidas
        </li>
        <li
          onClick={setShowFood}
          className={`${showConsumption.food ? s.active : ""}`}
        >
          Comidas
        </li>
        <li
          onClick={setShowGames}
          className={`${showConsumption.games ? s.active : ""}`}
        >
          Juegos
        </li>
      </ul>
    </nav>
  );
}
