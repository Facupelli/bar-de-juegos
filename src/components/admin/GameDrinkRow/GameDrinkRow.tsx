import { Drink, Game } from "../../../types/model";

type Props = {
  game?: Game;
  drink?: Drink;
  isGame?: boolean;
  isDrink?: boolean;
};

export default function GameDrinkRow({ game, drink, isGame, isDrink }: Props) {
  return (
    <tr>
      {isDrink && (
        <>
          <td>{drink?.name}</td>
          <td>{drink?.points}</td>
        </>
      )}
      {isGame && (
        <>
          <td>{game?.name}</td>
          <td>{game?.points}</td>
        </>
      )}
    </tr>
  );
}
