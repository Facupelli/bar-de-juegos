import { useForm } from "react-hook-form";
import { Drink, Game } from "../../types/model";

import s from "./PostPointsCard.module.scss";

type Props = {
  drinks: Drink[];
  games: Game[];
};

export default function PostPointsCard({ drinks, games }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm();

  return (
    <article>
      <form>
        <label>Bebida:</label>
        <select>
          {drinks?.length > 0 &&
            drinks.map((drink) => (
              <option value={drink.id}>{drink.name}</option>
            ))}
        </select>

        <label>Juego:</label>
        <select>
          {games?.length > 0 &&
            games.map((game) => <option value={game.id}>{game.name}</option>)}
        </select>
      </form>
    </article>
  );
}
