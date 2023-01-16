import s from "./ConsumptionsNav.module.scss";

type Props = {
  setShowDrinks: () => void;
  setShowGames: () => void;
  setShowFood: () => void;
};

export default function ConsumiptionsNav({
  setShowDrinks,
  setShowFood,
  setShowGames,
}: Props) {
  return (
    <nav className={s.nav}>
      <ul>
        <li onClick={setShowDrinks}>Bebidas</li>
        <li onClick={setShowFood}>Comidas</li>
        <li onClick={setShowGames}>Juegos</li>
      </ul>
    </nav>
  );
}
