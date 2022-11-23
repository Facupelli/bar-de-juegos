import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Drink, Game, Membership } from "../../../types/model";

type Props = {
  memberships: Membership[];
  games: Game[];
  drinks: Drink[];
};

export default function CreatePromotion({ memberships, games, drinks }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromotionData>();

  type PromotionData = {
    name: string;
    membershipsIds: string[];
    gamesIds: string[];
    drinksIds: string[];
  };

  const onSubmitPromotion: SubmitHandler<PromotionData> = async (data) => {
    const postMembership = await axios.post(
      "http://localhost:3000/api/promotion",
      data
    );

    if (postMembership.data.message) {
      console.log(postMembership.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPromotion)}>
      <h4>CREAR PROMOCION</h4>

      <label>Nombre:</label>
      <input type="text" {...register("name")} />

      <label>Membresias:</label>
      <select multiple {...register("membershipsIds")}>
        {memberships?.map((membership) => (
          <option value={membership.id}>{membership.name}</option>
        ))}
      </select>

      <label>Juegos:</label>
      <select multiple {...register("gamesIds")}>
        {games?.map((game) => (
          <option value={game.id}>{game.name}</option>
        ))}
      </select>

      <label>Bebidas:</label>
      <select multiple {...register("drinksIds")}>
        {drinks?.map((drink) => (
          <option value={drink.id}>{drink.name}</option>
        ))}
      </select>

      <button type="submit">CREAR</button>
    </form>
  );
}
