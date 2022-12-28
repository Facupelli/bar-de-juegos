export default function PercentageIcon({
  size,
  active,
}: {
  size: number;
  active?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-percentage"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={active ? "#2b2c2b" : "#e0e0e0"}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="17" cy="17" r="1" />
      <circle cx="7" cy="7" r="1" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}
