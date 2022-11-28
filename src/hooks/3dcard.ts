import { useEffect, RefObject } from "react";

export const use3dcard = (
  wrapperRef: RefObject<HTMLDivElement>,
  ticketRef: RefObject<HTMLDivElement>
) => {
  let halfWidth: number, halfHeight: number;

  useEffect(() => {
    if (wrapperRef.current && ticketRef.current) {
      const clientRect = ticketRef.current.getBoundingClientRect();
      console.log(clientRect.width);
      halfWidth = clientRect.width / 2;
      halfHeight = clientRect.height / 2;

      wrapperRef.current.addEventListener("mousemove", (event: MouseEvent) => {
        const { offsetX, offsetY } = event;

        const rotationX = ((offsetY - halfHeight) / halfHeight) * 10;
        const rotationY = ((offsetX - halfWidth) / halfWidth) * 10;

        if (ticketRef.current) {
          //   console.log(offsetX, rotationX);
          // console.log(offsetY, halfHeight, rotationY);

          ticketRef.current.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        }
      });
    }
  });
};
