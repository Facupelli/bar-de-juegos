import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  game?: boolean;
};

export default function CreateGame({ game }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    name: string;
    points: number;
  };

  const onSubmitGame: SubmitHandler<FormData> = async (data) => {
    const postGame = await axios.post(
      `http://localhost:3000/api/${game ? "game" : "drink"}`,
      data
    );

    if (postGame.data.message) {
      console.log(postGame.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitGame)}>
      <h4>CREAR {game ? "JUEGO" : "BEBIDA"}</h4>
      <label>Nombre:</label>
      <input type="text" {...register("name")} />
      <label>Puntos:</label>
      <input type="text" {...register("points")} />
      <button type="submit">CREAR</button>
    </form>
  );
}
