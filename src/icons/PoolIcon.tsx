export default function PoolIcon({
  size,
  active,
}: {
  size: number;
  active?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-credit-card"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMin slice"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={active ? "#2b2c2b" : "#e0e0e0"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="10" r="2" />
      <circle cx="12" cy="14" r="2" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}
