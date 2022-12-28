export default function BasketIcon({
  size,
  active,
}: {
  size: number;
  active?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-basket"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={active ? "#2b2c2b" : "#e0e0e0"}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="7 10 12 4 17 10" />
      <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z" />
      <circle cx="12" cy="15" r="2" />
    </svg>
  );
}
