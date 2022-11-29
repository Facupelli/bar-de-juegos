import s from "./Table.module.scss";

type Props = {
  children?: React.ReactNode;
  trTitles: string[];
};

export default function Table({ trTitles = [], children }: Props) {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          {trTitles.length > 0 &&
            trTitles.map((title) => <th key={title}>{title}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
