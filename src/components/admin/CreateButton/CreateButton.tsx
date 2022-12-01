import s from "./CreateButton.module.scss";

type Props = {
  title: string;
  onClick: () => void;
};

export default function CreateButton({ title, onClick }: Props) {
  return (
    <button type="button" onClick={onClick}>
      CREAR {title}
    </button>
  );
}
