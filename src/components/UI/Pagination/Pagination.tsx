import { Dispatch, SetStateAction } from "react";
import ButtonOnClick from "../ButtonOnClick/ButtonOnClick";

type Props = {
  skip: number;
  setSkip: Dispatch<SetStateAction<number>>;
  total: number;
  getNextPage: (skip: number) => void;
};

export default function Pagination({
  skip,
  setSkip,
  total,
  getNextPage,
}: Props) {
  return (
    <>
      <ButtonOnClick
        type="primary"
        handleClick={() => {
          if (skip === 0) return;
          getNextPage(skip - 20);
          setSkip((prev) => prev - 20);
        }}
        isDisabled={skip === 0}
      >
        {"<-"}
      </ButtonOnClick>
      <ButtonOnClick
        type="primary"
        handleClick={() => {
          if (skip + 20 > total) return;
          getNextPage(skip + 20);
          setSkip((prev) => prev + 20);
        }}
        isDisabled={skip + 20 > total}
      >
        {"->"}
      </ButtonOnClick>
    </>
  );
}
